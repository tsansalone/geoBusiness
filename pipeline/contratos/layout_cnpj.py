from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


SNAPSHOT_PARTES = (
    "00_pacote_original",
    "01_subarquivos_zip",
    "02_extraido_texto",
    "03_processado",
    "04_metadados",
)


@dataclass(frozen=True)
class FamiliaArquivo:
    nome: str
    prefixos_zip: tuple[str, ...]
    padroes_extraidos: tuple[str, ...]
    pasta_zip: str
    pasta_extraida: str
    colunas: tuple[str, ...]


FAMILIAS_CNPJ: dict[str, FamiliaArquivo] = {
    "empresas": FamiliaArquivo(
        nome="empresas",
        prefixos_zip=("Empresas",),
        padroes_extraidos=(".EMPRECSV",),
        pasta_zip="empresas",
        pasta_extraida="empresas",
        colunas=(
            "cnpj_basico",
            "razao_social",
            "natureza_juridica",
            "qualificacao_responsavel",
            "capital_social",
            "porte_empresa",
            "ente_federativo_responsavel",
        ),
    ),
    "estabelecimentos": FamiliaArquivo(
        nome="estabelecimentos",
        prefixos_zip=("Estabelecimentos",),
        padroes_extraidos=(".ESTABELE",),
        pasta_zip="estabelecimentos",
        pasta_extraida="estabelecimentos",
        colunas=(
            "cnpj_basico",
            "cnpj_ordem",
            "cnpj_dv",
            "identificador_matriz_filial",
            "nome_fantasia",
            "situacao_cadastral",
            "data_situacao_cadastral",
            "motivo_situacao_cadastral",
            "nome_cidade_exterior",
            "pais",
            "data_inicio_atividade",
            "cnae_fiscal_principal",
            "cnaes_secundarios",
            "tipo_logradouro",
            "logradouro",
            "numero",
            "complemento",
            "bairro",
            "cep",
            "uf",
            "municipio",
            "ddd_1",
            "telefone_1",
            "ddd_2",
            "telefone_2",
            "ddd_fax",
            "fax",
            "correio_eletronico",
            "situacao_especial",
            "data_situacao_especial",
        ),
    ),
    "socios": FamiliaArquivo(
        nome="socios",
        prefixos_zip=("Socios",),
        padroes_extraidos=(".SOCIOCSV",),
        pasta_zip="socios",
        pasta_extraida="socios",
        colunas=(
            "cnpj_basico",
            "identificador_socio",
            "nome_socio_razao_social",
            "cpf_cnpj_socio",
            "qualificacao_socio",
            "data_entrada_sociedade",
            "pais",
            "representante_legal",
            "nome_representante",
            "qualificacao_representante_legal",
            "faixa_etaria",
        ),
    ),
    "simples": FamiliaArquivo(
        nome="simples",
        prefixos_zip=("Simples",),
        padroes_extraidos=(".SIMPLES.CSV.",),
        pasta_zip="simples",
        pasta_extraida="simples",
        colunas=(
            "cnpj_basico",
            "opcao_pelo_simples",
            "data_opcao_pelo_simples",
            "data_exclusao_do_simples",
            "opcao_pelo_mei",
            "data_opcao_pelo_mei",
            "data_exclusao_do_mei",
        ),
    ),
    "dominios_cnaes": FamiliaArquivo(
        nome="dominios_cnaes",
        prefixos_zip=("Cnaes",),
        padroes_extraidos=(".CNAECSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
    "dominios_motivos": FamiliaArquivo(
        nome="dominios_motivos",
        prefixos_zip=("Motivos",),
        padroes_extraidos=(".MOTICSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
    "dominios_municipios": FamiliaArquivo(
        nome="dominios_municipios",
        prefixos_zip=("Municipios",),
        padroes_extraidos=(".MUNICCSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
    "dominios_naturezas": FamiliaArquivo(
        nome="dominios_naturezas",
        prefixos_zip=("Naturezas",),
        padroes_extraidos=(".NATJUCSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
    "dominios_paises": FamiliaArquivo(
        nome="dominios_paises",
        prefixos_zip=("Paises",),
        padroes_extraidos=(".PAISCSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
    "dominios_qualificacoes": FamiliaArquivo(
        nome="dominios_qualificacoes",
        prefixos_zip=("Qualificacoes",),
        padroes_extraidos=(".QUALSCSV",),
        pasta_zip="dominios",
        pasta_extraida="dominios",
        colunas=("codigo", "descricao"),
    ),
}


def raiz_snapshot(raiz_dados: str | Path, snapshot_mes: str) -> Path:
    return Path(raiz_dados) / "cnpj" / snapshot_mes


def pasta_familia_zip(raiz_dados: str | Path, snapshot_mes: str, familia: str) -> Path:
    definicao = FAMILIAS_CNPJ[familia]
    return raiz_snapshot(raiz_dados, snapshot_mes) / "01_subarquivos_zip" / definicao.pasta_zip


def pasta_familia_extraida(raiz_dados: str | Path, snapshot_mes: str, familia: str) -> Path:
    definicao = FAMILIAS_CNPJ[familia]
    return raiz_snapshot(raiz_dados, snapshot_mes) / "02_extraido_texto" / definicao.pasta_extraida


def classificar_zip(nome_arquivo: str) -> str | None:
    for familia, definicao in FAMILIAS_CNPJ.items():
        if nome_arquivo.endswith(".zip") and nome_arquivo.startswith(definicao.prefixos_zip):
            return familia
    return None


def classificar_extraido(nome_arquivo: str) -> str | None:
    for familia, definicao in FAMILIAS_CNPJ.items():
        if any(padrao in nome_arquivo for padrao in definicao.padroes_extraidos):
            return familia
    return None


def listar_arquivos_extraidos(raiz_dados: str | Path, snapshot_mes: str, familia: str) -> list[Path]:
    pasta = pasta_familia_extraida(raiz_dados, snapshot_mes, familia)
    if not pasta.exists():
        return []
    return sorted(caminho for caminho in pasta.iterdir() if caminho.is_file())


def validar_estrutura_snapshot(raiz_dados: str | Path, snapshot_mes: str) -> list[str]:
    erros: list[str] = []
    raiz = raiz_snapshot(raiz_dados, snapshot_mes)

    for parte in SNAPSHOT_PARTES:
        if not (raiz / parte).exists():
            erros.append(f"Pasta obrigatória ausente: {parte}")

    for familia in ("empresas", "estabelecimentos", "simples"):
        if not listar_arquivos_extraidos(raiz_dados, snapshot_mes, familia):
            erros.append(f"Sem arquivos extraídos para a família: {familia}")

    for familia in (
        "dominios_cnaes",
        "dominios_motivos",
        "dominios_municipios",
        "dominios_naturezas",
        "dominios_paises",
        "dominios_qualificacoes",
    ):
        if not listar_arquivos_extraidos(raiz_dados, snapshot_mes, familia):
            erros.append(f"Domínio não encontrado: {familia}")

    return erros


def gerar_resumo_familias(raiz_dados: str | Path, snapshot_mes: str) -> dict[str, dict[str, int]]:
    resumo: dict[str, dict[str, int]] = {}
    for familia in FAMILIAS_CNPJ:
        arquivos = listar_arquivos_extraidos(raiz_dados, snapshot_mes, familia)
        resumo[familia] = {
            "quantidade_arquivos": len(arquivos),
            "bytes_total": sum(arquivo.stat().st_size for arquivo in arquivos),
        }
    return resumo


def linhas_amostra(caminho: str | Path, quantidade: int = 3) -> list[str]:
    linhas: list[str] = []
    with Path(caminho).open("r", encoding="latin-1") as arquivo:
        for _ in range(quantidade):
            linha = arquivo.readline()
            if not linha:
                break
            linhas.append(linha.rstrip("\n"))
    return linhas


def iterar_familias_principais() -> Iterable[str]:
    return ("empresas", "estabelecimentos", "simples")
