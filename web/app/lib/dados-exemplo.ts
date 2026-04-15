import type { DetalheArea, Hexagono, QualidadeDados, Segmento } from "../tipos/geobusiness";

export const cidadePadrao = "Praia Grande - SP";

export const segmentos: Segmento[] = [
  {
    id: "cafeterias",
    nome: "Cafeterias",
    cnaePrincipal: "5611203",
    descricao: "Operações focadas em café, bebidas quentes e permanência curta."
  },
  {
    id: "farmacias",
    nome: "Farmácias",
    cnaePrincipal: "4771701",
    descricao: "Comércio varejista farmacêutico com operação de bairro."
  },
  {
    id: "academias",
    nome: "Academias",
    cnaePrincipal: "9313100",
    descricao: "Serviços de condicionamento físico e treino recorrente."
  }
];

export const hexagonos: Hexagono[] = [
  {
    hexId: "89a81000001ffff",
    nomeArea: "Canto do Forte",
    centroX: 180,
    centroY: 140,
    vizinhos: ["89a81000002ffff", "89a81000004ffff"],
    segmentos: {
      cafeterias: { ativos: 24, aberturas24m: 11, baixas24m: 4, taxaFechamento: 0.16, densidadeSegmento: 0.82, densidadeComplementares: 0.74, idadeMedianaMeses: 28, percentilSaturacao: 79, confiancaGeografica: "alta" },
      farmacias: { ativos: 8, aberturas24m: 2, baixas24m: 1, taxaFechamento: 0.11, densidadeSegmento: 0.34, densidadeComplementares: 0.49, idadeMedianaMeses: 52, percentilSaturacao: 63, confiancaGeografica: "alta" },
      academias: { ativos: 6, aberturas24m: 2, baixas24m: 1, taxaFechamento: 0.14, densidadeSegmento: 0.21, densidadeComplementares: 0.38, idadeMedianaMeses: 31, percentilSaturacao: 58, confiancaGeografica: "alta" }
    }
  },
  {
    hexId: "89a81000002ffff",
    nomeArea: "Boqueirão",
    centroX: 260,
    centroY: 140,
    vizinhos: ["89a81000001ffff", "89a81000003ffff", "89a81000005ffff"],
    segmentos: {
      cafeterias: { ativos: 18, aberturas24m: 9, baixas24m: 7, taxaFechamento: 0.29, densidadeSegmento: 0.66, densidadeComplementares: 0.72, idadeMedianaMeses: 19, percentilSaturacao: 71, confiancaGeografica: "media" },
      farmacias: { ativos: 7, aberturas24m: 1, baixas24m: 0, taxaFechamento: 0.04, densidadeSegmento: 0.28, densidadeComplementares: 0.52, idadeMedianaMeses: 61, percentilSaturacao: 49, confiancaGeografica: "media" },
      academias: { ativos: 4, aberturas24m: 1, baixas24m: 2, taxaFechamento: 0.33, densidadeSegmento: 0.16, densidadeComplementares: 0.29, idadeMedianaMeses: 14, percentilSaturacao: 43, confiancaGeografica: "media" }
    }
  },
  {
    hexId: "89a81000003ffff",
    nomeArea: "Guilhermina",
    centroX: 340,
    centroY: 140,
    vizinhos: ["89a81000002ffff", "89a81000006ffff"],
    segmentos: {
      cafeterias: { ativos: 29, aberturas24m: 14, baixas24m: 3, taxaFechamento: 0.11, densidadeSegmento: 0.91, densidadeComplementares: 0.85, idadeMedianaMeses: 33, percentilSaturacao: 91, confiancaGeografica: "alta" },
      farmacias: { ativos: 10, aberturas24m: 2, baixas24m: 1, taxaFechamento: 0.09, densidadeSegmento: 0.39, densidadeComplementares: 0.54, idadeMedianaMeses: 68, percentilSaturacao: 71, confiancaGeografica: "alta" },
      academias: { ativos: 7, aberturas24m: 3, baixas24m: 1, taxaFechamento: 0.13, densidadeSegmento: 0.23, densidadeComplementares: 0.33, idadeMedianaMeses: 37, percentilSaturacao: 62, confiancaGeografica: "alta" }
    }
  },
  {
    hexId: "89a81000004ffff",
    nomeArea: "Aviação",
    centroX: 220,
    centroY: 225,
    vizinhos: ["89a81000001ffff", "89a81000005ffff"],
    segmentos: {
      cafeterias: { ativos: 12, aberturas24m: 5, baixas24m: 6, taxaFechamento: 0.36, densidadeSegmento: 0.47, densidadeComplementares: 0.58, idadeMedianaMeses: 16, percentilSaturacao: 44, confiancaGeografica: "alta" },
      farmacias: { ativos: 6, aberturas24m: 1, baixas24m: 1, taxaFechamento: 0.13, densidadeSegmento: 0.22, densidadeComplementares: 0.34, idadeMedianaMeses: 47, percentilSaturacao: 37, confiancaGeografica: "alta" },
      academias: { ativos: 5, aberturas24m: 2, baixas24m: 1, taxaFechamento: 0.15, densidadeSegmento: 0.18, densidadeComplementares: 0.27, idadeMedianaMeses: 29, percentilSaturacao: 48, confiancaGeografica: "alta" }
    }
  },
  {
    hexId: "89a81000005ffff",
    nomeArea: "Tupi",
    centroX: 300,
    centroY: 225,
    vizinhos: ["89a81000002ffff", "89a81000004ffff", "89a81000006ffff"],
    segmentos: {
      cafeterias: { ativos: 21, aberturas24m: 7, baixas24m: 2, taxaFechamento: 0.09, densidadeSegmento: 0.76, densidadeComplementares: 0.8, idadeMedianaMeses: 41, percentilSaturacao: 84, confiancaGeografica: "alta" },
      farmacias: { ativos: 9, aberturas24m: 2, baixas24m: 0, taxaFechamento: 0.03, densidadeSegmento: 0.31, densidadeComplementares: 0.46, idadeMedianaMeses: 73, percentilSaturacao: 64, confiancaGeografica: "alta" },
      academias: { ativos: 9, aberturas24m: 4, baixas24m: 1, taxaFechamento: 0.1, densidadeSegmento: 0.32, densidadeComplementares: 0.42, idadeMedianaMeses: 35, percentilSaturacao: 77, confiancaGeografica: "alta" }
    }
  },
  {
    hexId: "89a81000006ffff",
    nomeArea: "Ocian",
    centroX: 380,
    centroY: 225,
    vizinhos: ["89a81000003ffff", "89a81000005ffff"],
    segmentos: {
      cafeterias: { ativos: 26, aberturas24m: 12, baixas24m: 5, taxaFechamento: 0.18, densidadeSegmento: 0.88, densidadeComplementares: 0.83, idadeMedianaMeses: 26, percentilSaturacao: 87, confiancaGeografica: "alta" },
      farmacias: { ativos: 12, aberturas24m: 3, baixas24m: 1, taxaFechamento: 0.07, densidadeSegmento: 0.43, densidadeComplementares: 0.57, idadeMedianaMeses: 66, percentilSaturacao: 82, confiancaGeografica: "alta" },
      academias: { ativos: 8, aberturas24m: 3, baixas24m: 1, taxaFechamento: 0.12, densidadeSegmento: 0.28, densidadeComplementares: 0.39, idadeMedianaMeses: 32, percentilSaturacao: 68, confiancaGeografica: "alta" }
    }
  }
];

export const detalhesArea: Record<string, DetalheArea> = {
  "89a81000001ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 2 }, { motivo: "Omissão contumaz", quantidade: 1 }, { motivo: "Inaptidão cadastral", quantidade: 1 }], serieAberturas: [2, 1, 3, 1, 2, 2], serieBaixas: [0, 1, 1, 0, 1, 1], observacao: "Área madura com bom suporte de fluxo e baixa concentração recente de falhas." },
  "89a81000002ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 3 }, { motivo: "Baixa por inatividade", quantidade: 2 }, { motivo: "Omissão contumaz", quantidade: 2 }], serieAberturas: [1, 2, 1, 2, 1, 2], serieBaixas: [1, 1, 0, 2, 1, 2], observacao: "Boa presença de demanda complementar, porém com histórico mais volátil e confiança geográfica média." },
  "89a81000003ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 2 }, { motivo: "Baixa por inatividade", quantidade: 1 }], serieAberturas: [2, 3, 2, 1, 3, 3], serieBaixas: [0, 1, 1, 0, 0, 1], observacao: "Concentração elevada do segmento com sinais saudáveis de permanência." },
  "89a81000004ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 4 }, { motivo: "Baixa por inatividade", quantidade: 1 }, { motivo: "Omissão contumaz", quantidade: 1 }], serieAberturas: [0, 1, 1, 1, 1, 1], serieBaixas: [1, 1, 1, 0, 2, 1], observacao: "Região ainda interessante para exploração, mas com taxa de fechamento acima da média da cidade." },
  "89a81000005ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 1 }, { motivo: "Baixa por inatividade", quantidade: 1 }], serieAberturas: [1, 1, 1, 2, 1, 1], serieBaixas: [0, 0, 0, 1, 1, 0], observacao: "Equilíbrio entre saturação e estabilidade, com bom ecossistema complementar." },
  "89a81000006ffff": { motivosBaixa: [{ motivo: "Encerramento voluntário", quantidade: 3 }, { motivo: "Baixa por inatividade", quantidade: 1 }, { motivo: "Inaptidão cadastral", quantidade: 1 }], serieAberturas: [2, 2, 3, 1, 2, 2], serieBaixas: [1, 0, 1, 1, 1, 1], observacao: "Área com alta densidade e tração recente, mas já bastante disputada." }
};

export const qualidadeDados: QualidadeDados = {
  snapshotReferencia: "2026-04",
  coberturaGeocodificacao: 0.87,
  confiancaAlta: 0.71,
  confiancaMedia: 0.16,
  confiancaBaixa: 0.13,
  enderecosParaRevisao: 381,
  arquivosPrevistos: ["Empresas", "Estabelecimentos", "Simples", "CNAEs", "Motivos", "Municipios", "Naturezas"],
  arquivosProcessados: ["Empresas", "Estabelecimentos", "Simples", "CNAEs", "Motivos", "Municipios", "Naturezas"]
};
