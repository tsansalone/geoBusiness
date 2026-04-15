import type {
  DetalheArea,
  FonteDados,
  HexagonoPainel,
  MetricasSegmento,
  QualidadeDados,
  Segmento
} from "../tipos/geobusiness";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RespostaMapaApi = {
  cidade: string;
  segmento_id: string;
  metrica: string;
  media_cidade: number;
  maior_valor: number;
  fonte_dados: FonteDados;
  hexagonos: Array<{
    hex_id: string;
    nome_area: string;
    centro_x: number;
    centro_y: number;
    valor: number;
    confianca_geografica: string;
    resumo: Record<string, number | string>;
  }>;
};

type RespostaAreaApi = {
  hex_id: string;
  nome_area: string;
  segmento_id: string;
  fonte_dados: FonteDados;
  metricas: Record<string, number | string>;
  series: Array<{ nome: string; valores: number[] }>;
  motivos_baixa: Array<{ motivo: string; quantidade: number }>;
  observacao: string;
  hexagonos_vizinhos: string[];
};

type RespostaQualidadeApi = {
  snapshot_referencia: string;
  fonte_dados: FonteDados;
  cobertura_geocodificacao: number;
  confianca_alta: number;
  confianca_media: number;
  confianca_baixa: number;
  enderecos_para_revisao: number;
  arquivos_previstos: string[];
  arquivos_processados: string[];
};

function mapearConfianca(valor: string | number | undefined): "alta" | "media" | "baixa" {
  if (valor === "alta" || valor === "media" || valor === "baixa") {
    return valor;
  }
  return "baixa";
}

function normalizarMetricas(metricas: Record<string, number | string>): MetricasSegmento {
  return {
    ativos: Number(metricas.ativos ?? 0),
    aberturas24m: Number(metricas.aberturas_24m ?? 0),
    baixas24m: Number(metricas.baixas_24m ?? 0),
    taxaFechamento: Number(metricas.taxa_fechamento ?? 0),
    densidadeSegmento: Number(metricas.densidade_segmento ?? 0),
    densidadeComplementares: Number(metricas.densidade_complementares ?? 0),
    idadeMedianaMeses: Number(metricas.idade_mediana_meses ?? 0),
    percentilSaturacao: Number(metricas.percentil_saturacao ?? 0),
    confiancaGeografica: mapearConfianca(metricas.confianca_geografica as string | undefined)
  };
}

async function buscarJson<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, { cache: "no-store" });
  if (!resposta.ok) {
    throw new Error(`Falha ao consultar API: ${caminho}`);
  }
  return resposta.json() as Promise<T>;
}

export async function carregarSegmentos(): Promise<Segmento[]> {
  const segmentos = await buscarJson<Array<{ id: string; nome: string; cnae_principal: string; descricao: string }>>("/segmentos");
  return segmentos.map((segmento) => ({
    id: segmento.id,
    nome: segmento.nome,
    cnaePrincipal: segmento.cnae_principal,
    descricao: segmento.descricao
  }));
}

export async function carregarQualidade(): Promise<QualidadeDados> {
  const qualidade = await buscarJson<RespostaQualidadeApi>("/qualidade-dados");
  return {
    snapshotReferencia: qualidade.snapshot_referencia,
    fonteDados: qualidade.fonte_dados,
    coberturaGeocodificacao: qualidade.cobertura_geocodificacao,
    confiancaAlta: qualidade.confianca_alta,
    confiancaMedia: qualidade.confianca_media,
    confiancaBaixa: qualidade.confianca_baixa,
    enderecosParaRevisao: qualidade.enderecos_para_revisao,
    arquivosPrevistos: qualidade.arquivos_previstos,
    arquivosProcessados: qualidade.arquivos_processados
  };
}

export async function carregarMapa(segmentoId: string, metrica: string): Promise<{
  cidade: string;
  fonteDados: FonteDados;
  hexagonos: HexagonoPainel[];
}> {
  const mapa = await buscarJson<RespostaMapaApi>(`/mapa/metricas-hex?segmento=${encodeURIComponent(segmentoId)}&metrica=${encodeURIComponent(metrica)}`);
  return {
    cidade: mapa.cidade,
    fonteDados: mapa.fonte_dados,
    hexagonos: mapa.hexagonos.map((hexagono) => ({
      hexId: hexagono.hex_id,
      nomeArea: hexagono.nome_area,
      centroX: hexagono.centro_x,
      centroY: hexagono.centro_y,
      vizinhos: [],
      metricas: normalizarMetricas(hexagono.resumo)
    }))
  };
}

export async function carregarDetalheArea(hexId: string, segmentoId: string): Promise<DetalheArea> {
  const detalhe = await buscarJson<RespostaAreaApi>(`/areas/${encodeURIComponent(hexId)}?segmento=${encodeURIComponent(segmentoId)}`);
  return {
    motivosBaixa: detalhe.motivos_baixa,
    serieAberturas: detalhe.series.find((serie) => serie.nome === "aberturas")?.valores ?? [],
    serieBaixas: detalhe.series.find((serie) => serie.nome === "baixas")?.valores ?? [],
    observacao: detalhe.observacao
  };
}
