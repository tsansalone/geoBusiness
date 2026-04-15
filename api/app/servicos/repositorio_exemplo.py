import json
from functools import lru_cache
from pathlib import Path


CAMINHO_BASE = Path(__file__).resolve().parents[3] / "dados_exemplo" / "api" / "base_analitica.json"


@lru_cache(maxsize=1)
def carregar_base() -> dict:
    with CAMINHO_BASE.open(encoding="utf-8") as arquivo:
        return json.load(arquivo)


def listar_segmentos() -> list[dict]:
    return carregar_base()["segmentos"]


def obter_segmento(segmento_id: str | None) -> dict:
    segmentos = listar_segmentos()
    if segmento_id is None:
        return segmentos[0]

    for segmento in segmentos:
        if segmento["id"] == segmento_id:
            return segmento

    raise KeyError(f"Segmento não encontrado: {segmento_id}")


def listar_hexagonos() -> list[dict]:
    return carregar_base()["hexagonos"]


def obter_hexagono(hex_id: str) -> dict:
    for hexagono in listar_hexagonos():
        if hexagono["hex_id"] == hex_id:
            return hexagono
    raise KeyError(f"Hexágono não encontrado: {hex_id}")


def obter_detalhe_area(hex_id: str) -> dict:
    detalhes = carregar_base()["detalhes_area"]
    if hex_id not in detalhes:
        raise KeyError(f"Detalhe da área não encontrado: {hex_id}")
    return detalhes[hex_id]


def obter_qualidade_dados() -> dict:
    return carregar_base()["qualidade_dados"]


def obter_cidade() -> str:
    return carregar_base()["cidade"]["nome"]
