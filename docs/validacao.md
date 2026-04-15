# Validação e testes

## Objetivo

Garantir que mudanças no repositório sejam percebidas rapidamente, principalmente enquanto a aplicação ainda combina base sintética, notebooks e pipeline em evolução.

## Validação local

Script principal:

- [infra/scripts/validar-local.ps1](/C:/Users/Thiago/geoBusiness/infra/scripts/validar-local.ps1)

O script tenta executar:

1. criação opcional da `.venv` local da API
2. instalação de dependências da API
3. testes `pytest` da API
4. instalação de dependências do frontend
5. checagem de tipos com `tsc`
6. build do frontend

Ele procura Python nesta ordem:

- `.venv\Scripts\python.exe` dentro de `api/`
- `python` no `PATH`

Se encontrar apenas o Python global, ele usa esse executável para criar ou atualizar a `.venv` local da API antes da instalação.

Se Python ou npm não estiverem disponíveis no ambiente, o script registra o motivo e pula a etapa correspondente.

## Compatibilidade validada

- API: Python `3.11` a `3.14`
- Frontend: Node.js `20+`

## Validação contínua

Workflow:

- [`.github/workflows/validacao.yml`](/C:/Users/Thiago/geoBusiness/.github/workflows/validacao.yml)

Ele executa:

- testes da API em Python 3.11
- checagem de tipos do frontend
- build do frontend

## O que a validação cobre hoje

- rotas da API com base sintética
- integridade do scaffold do frontend
- integração do frontend com a API local e fallback demonstrativo
- regressões estruturais óbvias no repositório

## Resultado mais recente

Validação local já confirmada neste repositório:

- `pip install -r requirements.txt` da API passou em Python `3.14`
- `pytest` da API passou em Python `3.14`
- `tsc --noEmit` do frontend passou
- `next build` do frontend passou com a integração da API e fallback local

Limitação do ambiente atual:

- a validação completa da API depende de um Python local utilizável fora das restrições do sandbox

## O que ainda não cobre

- execução real dos notebooks no Colab
- integração da API com artefatos reais processados
- validação geoespacial com dados verdadeiros de Praia Grande

## Próximos passos recomendados

- adicionar um teste de contrato para os notebooks
- validar a leitura do primeiro recorte real em `processado/recorte`
- adicionar testes de transformação `recorte -> preparado -> analitico`
- atualizar `next` para uma versão corrigida de segurança antes de endurecer a esteira de CI
