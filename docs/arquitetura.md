# Arquitetura do GeoBusiness

## Visão geral

O GeoBusiness foi desenhado como um POC modular, barato e evolutivo. A arquitetura separa claramente:

- processamento pesado de dados
- persistência analítica
- API de consulta
- interface de exploração

## Estratégia de execução

### Colab

O Google Colab é usado para:

- leitura dos arquivos mensais do CNPJ
- limpeza e padronização
- geocodificação experimental
- agregação espacial em H3
- exportação de artefatos compactos

### Ambiente local

O ambiente local é usado para:

- PostgreSQL + PostGIS
- API FastAPI
- aplicação web em Next.js
- validação da experiência analítica

## Camadas de dados

### Bronze

Arquivos brutos, imutáveis e versionados por `snapshot_mes`.

### Silver

Tabelas normalizadas e enriquecidas, já com chaves consistentes, domínios resolvidos e trilha de qualidade.

### Gold

Tabelas analíticas prontas para consumo da API, normalmente agregadas por:

- cidade
- hexágono H3
- segmento CNAE
- mês de referência

## Componentes

### Pipeline

Responsável por ingestão, padronização, geocodificação, reconstrução histórica e agregações.

### Banco analítico

Responsável por armazenar:

- snapshots
- dimensões
- fatos de eventos
- agregados por hexágono

### API

Responsável por servir:

- lista de segmentos
- métricas do mapa
- detalhe de área
- comparação entre áreas
- qualidade dos dados
- registro de snapshots a processar

### Web

Responsável por:

- filtrar cidade, período, segmento e recortes
- exibir mapa analítico
- explicar métricas
- comparar áreas
- comunicar confiança e qualidade

## Restrições importantes

- O v1 não depende de serviços pagos.
- O v1 usa CNPJ como base principal.
- O v1 evita análises orientadas por dados de sócios e CPF.
- O v1 prioriza explicabilidade em vez de modelos preditivos complexos.

## Fluxo resumido

1. O snapshot mensal do CNPJ é baixado e armazenado.
2. O pipeline normaliza arquivos e resolve tabelas de domínio.
3. Os estabelecimentos são geocodificados e atribuídos a hexágonos H3.
4. Eventos históricos e métricas são materializados.
5. A API expõe os agregados.
6. A interface permite exploração e comparação.
