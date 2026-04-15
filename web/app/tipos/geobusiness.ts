export type FonteDados = "real" | "sintetica";

export type Segmento = {
  id: string;
  nome: string;
  cnaePrincipal: string;
  descricao: string;
};

export type MetricasSegmento = {
  ativos: number;
  aberturas24m: number;
  baixas24m: number;
  taxaFechamento: number;
  densidadeSegmento: number;
  densidadeComplementares: number;
  idadeMedianaMeses: number;
  percentilSaturacao: number;
  confiancaGeografica: "alta" | "media" | "baixa";
};

export type Hexagono = {
  hexId: string;
  nomeArea: string;
  centroX: number;
  centroY: number;
  vizinhos: string[];
  segmentos: Record<string, MetricasSegmento>;
};

export type HexagonoPainel = {
  hexId: string;
  nomeArea: string;
  centroX: number;
  centroY: number;
  vizinhos: string[];
  metricas: MetricasSegmento;
};

export type DetalheArea = {
  motivosBaixa: Array<{ motivo: string; quantidade: number }>;
  serieAberturas: number[];
  serieBaixas: number[];
  observacao: string;
};

export type QualidadeDados = {
  snapshotReferencia: string;
  fonteDados: FonteDados;
  coberturaGeocodificacao: number;
  confiancaAlta: number;
  confiancaMedia: number;
  confiancaBaixa: number;
  enderecosParaRevisao: number;
  arquivosPrevistos: string[];
  arquivosProcessados: string[];
};
