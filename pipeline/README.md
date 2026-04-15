# Pipeline do GeoBusiness

## Objetivo

Transformar snapshots mensais do CNPJ em artefatos analíticos reutilizáveis pelo POC.

## Conteúdo

- `contratos/`: layout e convenções do CNPJ
- `scripts/`: utilitários operacionais
- `testes/`: verificações básicas do contrato

## Scripts iniciais

- `inspecionar_snapshot.py`
- `gerar_manifesto_snapshot.py`
- `recortar_cidade_alvo.py`

## Estratégia

O processamento pesado deve acontecer preferencialmente no Google Colab, com saída em formatos compactos para consumo local.
