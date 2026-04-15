# GeoBusiness

POC em PT-BR para análise geoespacial de abertura, densidade, sobrevivência e fechamento de negócios com base nos Dados Abertos do CNPJ.

## Objetivo

O projeto foi estruturado para ajudar analistas a responder perguntas como:

- Onde um segmento já apresenta massa crítica?
- Em quais regiões houve concentração de baixas para um tipo de negócio?
- Como a região se comporta ao longo do tempo em aberturas, encerramentos e sobrevivência?
- Existe evidência histórica suficiente para sugerir cautela ou oportunidade?

O foco do v1 é uma aplicação analítica explicável, barata de desenvolver e pronta para crescer quando os snapshots reais do CNPJ estiverem disponíveis.

No momento, a cidade-alvo padrão do POC é `Praia Grande - SP`. Enquanto o primeiro recorte real ainda não foi processado ponta a ponta, a API e a interface continuam usando uma base analítica sintética para prototipação.

## Princípios do repositório

- Idioma padrão do projeto: português brasileiro.
- Custo baixo: Colab para processamento pesado e ambiente local para app e banco.
- Documentação forte desde o início.
- Dados cadastrais do CNPJ como fonte principal no v1.
- Transparência analítica acima de modelos opacos.

## Estrutura

```text
api/            Backend FastAPI e testes
dados_exemplo/  Amostras seguras e base analítica sintética
docs/           Arquitetura, modelo de dados, métricas e ADRs
infra/          Docker Compose, scripts e configuração local
notebooks/      Materiais reproduzíveis para Google Colab
pipeline/       Contratos e scripts de ingestão/transformação
web/            Aplicação web em Next.js com interface em PT-BR
```

## Como começar

### 1. Backend

Pré-requisitos:

- Python 3.11+

Comandos:

```bash
cd api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

A API ficará disponível em `http://localhost:8000`.

### 2. Frontend

Pré-requisitos:

- Node.js 20+

Comandos:

```bash
cd web
npm install
npm run dev
```

A interface ficará disponível em `http://localhost:3000`.

### 3. Banco local

O repositório inclui um `docker-compose.yml` com PostgreSQL + PostGIS em [infra/docker-compose.yml](/C:/Users/Thiago/geoBusiness/infra/docker-compose.yml). O Docker não está disponível neste ambiente de desenvolvimento atual, então a configuração foi preparada, mas não validada aqui.

## Modo de trabalho recomendado

1. Usar os notebooks do Colab para ingestão, limpeza, geocodificação e agregações.
2. Exportar artefatos compactos para consumo local.
3. Carregar as tabelas analíticas no banco.
4. Usar a API para servir métricas e a aplicação web para exploração.

## Documentação principal

- [Arquitetura](</C:/Users/Thiago/geoBusiness/docs/arquitetura.md>)
- [Dados do CNPJ](</C:/Users/Thiago/geoBusiness/docs/dados-cnpj.md>)
- [Modelo de dados](</C:/Users/Thiago/geoBusiness/docs/modelo-de-dados.md>)
- [Dicionário de métricas](</C:/Users/Thiago/geoBusiness/docs/dicionario-de-metricas.md>)
- [Operação de snapshots](</C:/Users/Thiago/geoBusiness/docs/operacao-do-snapshot.md>)
- [Processo Colab](</C:/Users/Thiago/geoBusiness/docs/processo-colab.md>)
- [Qualidade dos dados](</C:/Users/Thiago/geoBusiness/docs/qualidade-dos-dados.md>)
- [Status da implementação](</C:/Users/Thiago/geoBusiness/docs/status-implementacao.md>)
- [Decisões arquiteturais](</C:/Users/Thiago/geoBusiness/docs/decisoes>)

## Situação atual do POC

Este scaffold entrega:

- backend com rotas previstas no plano
- frontend em PT-BR com filtros, mapa hexagonal sintético e painéis analíticos
- dados de exemplo coerentes entre API e web
- contrato inicial da pipeline e amostras sintéticas do CNPJ
- documentação-base para evolução do projeto

## Fontes de referência

- [Nota Técnica RFB-COCAD n47.pdf](</C:/Users/Thiago/geoBusiness/Nota Técnica RFB-COCAD n47.pdf>)
- [Nota Técnica RFB-COCAD n86.pdf](</C:/Users/Thiago/geoBusiness/Nota Técnica RFB-COCAD n86.pdf>)
- [cnpj-metadados.pdf](</C:/Users/Thiago/geoBusiness/cnpj-metadados.pdf>)
- [Nota Técnica RFB/COCAD nº 47/2024](https://www.gov.br/receitafederal/dados/nota_cocad_no_47_2024.pdf)
- [Nota COCAD/RFB nº 86/2024](https://www.gov.br/receitafederal/dados/nota-cocad-rfb-86-2024.pdf/view)
- [Metadados do CNPJ](https://www.gov.br/receitafederal/dados/cnpj-metadados.pdf/view)
