# Guia para Agentes e Desenvolvedores

Este arquivo orienta como agentes de IA e desenvolvedores humanos devem interagir com este repositório.

## Objetivo do projeto

O GeoBusiness é um POC em PT-BR para apoiar decisões sobre abertura de negócios com base no histórico do CNPJ, usando análise espacial, recortes por segmento e métricas explicáveis.

No estado atual:

- a cidade-alvo padrão é `Praia Grande - SP`
- o código do município no layout do CNPJ é `6921`
- a API e a interface ainda usam base sintética para prototipação
- o fluxo real de dados está sendo preparado via Colab

## Princípios obrigatórios

- Todo o projeto deve permanecer em português brasileiro.
- Toda mudança relevante deve atualizar a documentação correspondente no mesmo ciclo de trabalho.
- Commits devem ser pequenos, focados e com mensagem clara em português.
- Cada commit deve tratar uma única intenção de mudança.
- Evitar commits genéricos como `initial commit`, `ajustes` ou `correções`.
- Não misturar no mesmo commit mudanças de dados, docs, validação, infra ou frontend quando elas puderem ser entendidas separadamente.
- Não manter localmente camadas pesadas do snapshot quando elas puderem ser recriadas no Colab.

## Como pensar sobre o repositório

### Backend

Pasta: `api/`

Responsável por expor rotas analíticas para a interface e para integração futura com dados processados reais.

### Frontend

Pasta: `web/`

Responsável pela experiência analítica em PT-BR. Deve preservar a proposta de um produto explicável, não um score opaco.

### Pipeline

Pasta: `pipeline/`

Responsável pelo contrato dos snapshots, inspeção, geração de manifesto e recorte da cidade-alvo.

### Notebooks

Pasta: `notebooks/`

Responsável pelo fluxo prático no Colab. O padrão atual é partir apenas do ZIP mensal original.

### Documentação

Pasta: `docs/`

Responsável por arquitetura, modelo de dados, qualidade, métricas, snapshots, decisões e status.

## Regra de ouro para dados

No computador local, manter preferencialmente apenas:

- `dados_brutos/cnpj/AAAA-MM/original/`
- `dados_brutos/cnpj/AAAA-MM/metadados/`

Não manter por padrão:

- `subarquivos_zip`
- `extraido`
- `processado`

Essas camadas podem ser recriadas no disco temporário do Colab.

## Fluxo padrão no Colab

1. Fazer upload apenas do ZIP mensal original para `/content/uploads/`.
2. Deixar o notebook preparar o snapshot em `/content/dados_brutos/cnpj/AAAA-MM/`.
3. Validar famílias e amostras.
4. Gerar o recorte do município-alvo.
5. Exportar apenas os artefatos processados necessários.

## Quando alterar documentação

Atualize a documentação sempre que houver mudança em:

- fluxo de dados
- retenção de arquivos
- convenções de pasta
- cidade-alvo padrão
- notebooks
- contratos da pipeline
- comportamento da API
- comportamento da interface

Arquivos mais comuns para atualizar:

- `README.md`
- `docs/dados-cnpj.md`
- `docs/processo-colab.md`
- `docs/operacao-do-snapshot.md`
- `docs/status-implementacao.md`
- `docs/validacao.md`

## Convenções de commit

Preferir mensagens como:

- `docs: ...`
- `feat(api): ...`
- `feat(web): ...`
- `feat(colab): ...`
- `feat(dados): ...`
- `chore(infra): ...`

Cada commit deve responder com clareza:

- o que mudou
- em qual parte do sistema
- por que isso existe

Antes de commitar, conferir:

- se o diff inteiro conta uma história única
- se há arquivos de temas diferentes que merecem commits separados
- se a mensagem explica a intenção sem soar genérica
- se a documentação da mudança foi junto no mesmo ciclo

## O que evitar

- introduzir texto de interface em inglês
- manter documentação desatualizada
- criar dados locais pesados sem necessidade
- misturar mudanças grandes e desconexas no mesmo commit
- trocar convenções do projeto sem registrar nos `.md`

## Leitura mínima antes de mexer no projeto

Antes de fazer mudanças relevantes, leia:

- `README.md`
- `docs/dados-cnpj.md`
- `docs/processo-colab.md`
- `docs/status-implementacao.md`

Se a mudança for em dados, leia também:

- `pipeline/contratos/layout_cnpj.py`

Se a mudança for em produto:

- `docs/arquitetura.md`
- `docs/dicionario-de-metricas.md`

## Estado atual esperado

Ao continuar o desenvolvimento, o próximo foco natural é:

- gerar o primeiro recorte real de `Praia Grande - SP`
- ligar a API aos artefatos reais processados
- substituir gradualmente a base sintética da interface
