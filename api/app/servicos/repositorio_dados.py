import json
from functools import lru_cache
from pathlib import Path
from typing import Any

import pandas as pd

from app.servicos import repositorio_exemplo

RAIZ_PROJETO = Path(__file__).resolve().parents[3]
RAIZ_DADOS = RAIZ_PROJETO / "dados_brutos" / "cnpj"
ARQUIVOS_ANALITICOS_OBRIGATORIOS = (
    "hex_segmento_atual.parquet",
    "areas_detalhe_atual.parquet",
    "qualidade_espacial_resumo.json",
)


def _normalizar_json(valor: Any) -> Any:
    if isinstance(valor, str):
        texto = valor.strip()
        if texto.startswith("[") or texto.startswith("{"):
            return json.loads(texto)
    return valor


def _descobrir_snapshot_real() -> str | None:
    if not RAIZ_DADOS.exists():
        return None

    candidatos: list[str] = []
    for pasta_snapshot in sorted([pasta for pasta in RAIZ_DADOS.iterdir() if pasta.is_dir()]):
        pasta_analitico = pasta_snapshot / "processado" / "analitico"
        if all((pasta_analitico / arquivo).exists() for arquivo in ARQUIVOS_ANALITICOS_OBRIGATORIOS):
            candidatos.append(pasta_snapshot.name)

    return candidatos[-1] if candidatos else None


def fonte_real_disponivel() -> bool:
    return _descobrir_snapshot_real() is not None


def _caminho_analitico(snapshot_mes: str) -> Path:
    return RAIZ_DADOS / snapshot_mes / "processado" / "analitico"


@lru_cache(maxsize=1)
def carregar_base() -> dict[str, Any]:
    snapshot_mes = _descobrir_snapshot_real()
    if snapshot_mes is None:
        base = repositorio_exemplo.carregar_base().copy()
        base["fonte_dados"] = "sintetica"
        return base

    pasta_analitico = _caminho_analitico(snapshot_mes)
    hexagonos_df = pd.read_parquet(pasta_analitico / "hex_segmento_atual.parquet")
    areas_df = pd.read_parquet(pasta_analitico / "areas_detalhe_atual.parquet")
    qualidade = json.loads((pasta_analitico / "qualidade_espacial_resumo.json").read_text(encoding="utf-8"))

    segmentos = (
        hexagonos_df[["segmento_id", "cnae_fiscal_principal", "segmento_nome"]]
        .drop_duplicates()
        .rename(
            columns={
                "segmento_id": "id",
                "cnae_fiscal_principal": "cnae_principal",
                "segmento_nome": "nome",
            }
        )
    )
    segmentos["descricao"] = segmentos["nome"]

    hexagonos: list[dict[str, Any]] = []
    for hex_id, grupo in hexagonos_df.groupby("hex_id"):
        primeira_linha = grupo.iloc[0]
        segmentos_hex: dict[str, Any] = {}
        for _, linha in grupo.iterrows():
            segmentos_hex[str(linha["segmento_id"])] = {
                "ativos": int(linha["ativos"]),
                "baixadas_atuais": int(linha.get("baixadas_atuais", 0)),
                "aberturas_24m": int(linha["aberturas_24m"]),
                "baixas_24m": int(linha["baixas_24m"]),
                "taxa_fechamento": float(linha["taxa_fechamento"]),
                "densidade_segmento": float(linha["densidade_segmento"]),
                "densidade_complementares": float(linha["densidade_complementares"]),
                "idade_mediana_meses": int(round(float(linha["idade_mediana_meses"]))) if pd.notna(linha["idade_mediana_meses"]) else 0,
                "percentil_saturacao": int(linha["percentil_saturacao"]),
                "confianca_geografica": str(linha["confianca_geografica"]),
            }

        hexagonos.append(
            {
                "hex_id": str(hex_id),
                "nome_area": str(primeira_linha["nome_area"]),
                "centro_x": int(primeira_linha["centro_x"]),
                "centro_y": int(primeira_linha["centro_y"]),
                "vizinhos": _normalizar_json(primeira_linha["hexagonos_vizinhos"]),
                "segmentos": segmentos_hex,
            }
        )

    detalhes_area: dict[str, Any] = {}
    for _, linha in areas_df.iterrows():
        detalhes_area[str(linha["hex_id"])] = {
            "motivos_baixa": _normalizar_json(linha["motivos_baixa_json"]),
            "serie_aberturas": _normalizar_json(linha["serie_aberturas_json"]),
            "serie_baixas": _normalizar_json(linha["serie_baixas_json"]),
            "observacao": str(linha["observacao"]),
            "hexagonos_vizinhos": _normalizar_json(linha["hexagonos_vizinhos_json"]),
        }

    return {
        "cidade": {
            "id": "6921",
            "nome": str(qualidade.get("cidade", "Praia Grande - SP")),
            "fonte": "analitico_real",
        },
        "segmentos": segmentos.to_dict(orient="records"),
        "hexagonos": hexagonos,
        "detalhes_area": detalhes_area,
        "qualidade_dados": {
            "snapshot_referencia": str(qualidade["snapshot_referencia"]),
            "cobertura_geocodificacao": float(qualidade["cobertura_geocodificacao"]),
            "confianca_alta": float(qualidade["confianca_alta"]),
            "confianca_media": float(qualidade["confianca_media"]),
            "confianca_baixa": float(qualidade["confianca_baixa"]),
            "enderecos_para_revisao": int(qualidade["enderecos_para_revisao"]),
            "arquivos_previstos": list(qualidade["arquivos_previstos"]),
            "arquivos_processados": list(qualidade["arquivos_processados"]),
        },
        "fonte_dados": "real",
    }


def listar_segmentos() -> list[dict[str, Any]]:
    return list(carregar_base()["segmentos"])


def obter_segmento(segmento_id: str | None) -> dict[str, Any]:
    segmentos = listar_segmentos()
    if segmento_id is None:
        return segmentos[0]

    for segmento in segmentos:
        if segmento["id"] == segmento_id:
            return segmento

    raise KeyError(f"Segmento não encontrado: {segmento_id}")


def listar_hexagonos() -> list[dict[str, Any]]:
    return list(carregar_base()["hexagonos"])


def obter_hexagono(hex_id: str) -> dict[str, Any]:
    for hexagono in listar_hexagonos():
        if hexagono["hex_id"] == hex_id:
            return hexagono
    raise KeyError(f"Hexágono não encontrado: {hex_id}")


def obter_detalhe_area(hex_id: str) -> dict[str, Any]:
    detalhes = carregar_base()["detalhes_area"]
    if hex_id not in detalhes:
        raise KeyError(f"Detalhe da área não encontrado: {hex_id}")
    return detalhes[hex_id]


def obter_qualidade_dados() -> dict[str, Any]:
    qualidade = dict(carregar_base()["qualidade_dados"])
    qualidade["fonte_dados"] = obter_fonte_dados()
    return qualidade


def obter_cidade() -> str:
    return str(carregar_base()["cidade"]["nome"])


def obter_fonte_dados() -> str:
    return str(carregar_base()["fonte_dados"])
