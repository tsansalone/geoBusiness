from typing import List

from pydantic import BaseModel, Field


class Segmento(BaseModel):
    id: str
    cnae_principal: str
    nome: str
    descricao: str


class HexagonoMetrico(BaseModel):
    hex_id: str
    nome_area: str
    centro_x: int
    centro_y: int
    valor: float
    confianca_geografica: str
    resumo: dict[str, float | int | str]


class RespostaMapa(BaseModel):
    cidade: str
    segmento_id: str
    metrica: str
    media_cidade: float
    maior_valor: float
    hexagonos: List[HexagonoMetrico]


class SerieTemporal(BaseModel):
    nome: str
    valores: List[int]


class MotivoBaixa(BaseModel):
    motivo: str
    quantidade: int


class RespostaArea(BaseModel):
    hex_id: str
    nome_area: str
    segmento_id: str
    metricas: dict[str, float | int | str]
    series: List[SerieTemporal]
    motivos_baixa: List[MotivoBaixa]
    observacao: str
    hexagonos_vizinhos: List[str] = Field(default_factory=list)


class ItemComparacao(BaseModel):
    hex_id: str
    nome_area: str
    ativos: int
    aberturas_24m: int
    baixas_24m: int
    taxa_fechamento: float
    densidade_segmento: float
    percentil_saturacao: int
    confianca_geografica: str


class RespostaComparacao(BaseModel):
    cidade: str
    segmento_id: str
    areas: List[ItemComparacao]


class RespostaQualidade(BaseModel):
    snapshot_referencia: str
    cobertura_geocodificacao: float
    confianca_alta: float
    confianca_media: float
    confianca_baixa: float
    enderecos_para_revisao: int
    arquivos_previstos: List[str]
    arquivos_processados: List[str]


class RequisicaoSnapshot(BaseModel):
    snapshot_mes: str
    cidade: str
    origem_arquivos: str
    observacao: str | None = None


class RespostaIngestao(BaseModel):
    status: str
    mensagem: str
    proximo_passo: str
    snapshot_mes: str
