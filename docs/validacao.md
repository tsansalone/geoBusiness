# Validação e testes

## Objetivo

Garantir que mudanças no repositório sejam percebidas rapidamente, principalmente enquanto a aplicação ainda combina base sintética, notebooks e pipeline em evolução.

## Validação local

Script principal:

- [infra/scripts/validar-local.ps1](/C:/Users/Thiago/geoBusiness/infra/scripts/validar-local.ps1)

O script tenta executar:

1. instalação de dependências da API
2. testes `pytest` da API
3. instalação de dependências do frontend
4. checagem de tipos com `tsc`
5. build do frontend

Se Python ou npm não estiverem disponíveis no ambiente, o script registra o motivo e pula a etapa correspondente.

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
- regressões estruturais óbvias no repositório

## Resultado mais recente

Validação local já confirmada neste repositório:

- `tsc --noEmit` do frontend passou
- `next build` do frontend passou com a base sintética

Limitação do ambiente atual:

- os testes da API não foram executados aqui porque o Python não está disponível neste ambiente local de trabalho

## O que ainda não cobre

- execução real dos notebooks no Colab
- integração da API com artefatos reais processados
- validação geoespacial com dados verdadeiros de Praia Grande

## Próximos passos recomendados

- adicionar um teste de contrato para os notebooks
- validar a leitura do primeiro recorte real em `bronze`
- adicionar testes de transformação `bronze -> silver -> gold`
- atualizar `next` para uma versão corrigida de segurança antes de endurecer a esteira de CI
