# ADR 0002: estratégia local + Colab

## Status

Aprovado

## Contexto

O projeto precisa permanecer barato durante o POC, sem contratação de novas assinaturas, mas ainda precisa lidar com processamento potencialmente pesado de dados mensais do CNPJ.

## Decisão

Adotar uma arquitetura híbrida:

- Google Colab para exploração, ingestão, geocodificação experimental e agregações
- ambiente local para banco, API e interface

## Consequências

- custo inicial muito baixo
- notebooks reproduzíveis passam a ser parte crítica do projeto
- o banco local recebe dados já reduzidos e tratados
- a futura migração para uma esteira mais robusta fica facilitada
