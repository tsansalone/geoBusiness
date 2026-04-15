# Modelo de dados

## Princípio

O modelo foi desenhado para preservar o histórico mensal do CNPJ e, ao mesmo tempo, servir consultas rápidas para análise espacial.

## Entidades principais

### `raw_cnpj_empresas`

Espelha o arquivo `Empresas` do snapshot mensal.

Campos centrais:

- `snapshot_mes`
- `cnpj_basico`
- `razao_social`
- `natureza_juridica`
- `qualificacao_responsavel`
- `capital_social`
- `porte_empresa`
- `ente_federativo_responsavel`

### `raw_cnpj_estabelecimentos`

Espelha o arquivo `Estabelecimentos`.

Campos centrais:

- `snapshot_mes`
- `cnpj_basico`
- `cnpj_ordem`
- `cnpj_dv`
- `identificador_matriz_filial`
- `nome_fantasia`
- `situacao_cadastral`
- `motivo_situacao_cadastral`
- `data_situacao_cadastral`
- `data_inicio_atividade`
- `cnae_fiscal_principal`
- `cnaes_secundarios`
- `logradouro`
- `numero`
- `bairro`
- `cep`
- `municipio`
- `uf`

### `raw_cnpj_simples`

Espelha o arquivo `Simples`.

Campos centrais:

- `snapshot_mes`
- `cnpj_basico`
- `opcao_simples`
- `data_opcao_simples`
- `data_exclusao_simples`
- `opcao_mei`
- `data_opcao_mei`
- `data_exclusao_mei`

## Dimensões

### `dim_estabelecimento`

Consolida a identidade do estabelecimento ao longo do tempo.

### `dim_empresa`

Consolida atributos estáveis da empresa.

### `dim_cnae`

Descrição oficial das atividades econômicas.

### `dim_motivo_situacao`

Descrição dos códigos de motivo da situação cadastral.

### `dim_municipio`

Domínio de município usado para integridade e filtros.

## Fatos

### `fact_estabelecimento_snapshot`

Uma linha por estabelecimento por snapshot mensal.

### `fact_estabelecimento_evento`

Eventos derivados entre snapshots:

- abertura
- mudança de situação
- baixa
- reativação

### `fact_hex_segmento_mes`

Tabela pronta para a camada analítica, agregada por:

- cidade
- `hex_id`
- `segmento_cnae`
- `mes_referencia`

Campos esperados:

- `ativos`
- `aberturas_mes`
- `baixas_mes`
- `churn_liquido`
- `taxa_fechamento`
- `idade_mediana_meses`
- `densidade_segmento`
- `densidade_complementares`
- `confianca_geocodificacao`

## Camadas de trabalho do POC atual

### `processado/recorte`

Primeiro recorte persistido do snapshot da cidade-alvo.

Arquivos centrais:

- `estabelecimentos_municipio.parquet`
- `empresas_municipio.parquet`
- `simples_municipio.parquet`

### `processado/preparado`

Camada intermediária com limpeza, chaves derivadas e trilha de qualidade para geocodificação.

Arquivos centrais:

- `estabelecimentos_preparados.parquet`
- `empresas_preparadas.parquet`
- `simples_preparados.parquet`
- `estabelecimentos_geocodificados.parquet`

### `processado/analitico`

Camada pronta para consumo da API e da interface.

Arquivos centrais:

- `hex_segmento_atual.parquet`
- `areas_detalhe_atual.parquet`
- `qualidade_espacial_resumo.json`

## Qualidade e rastreabilidade

Toda entidade derivada deve carregar:

- origem do snapshot
- data de processamento
- versão do pipeline
- sinalizador de confiança geográfica
