# Operação de snapshots do CNPJ

## Objetivo

Garantir que cada snapshot mensal siga sempre o mesmo fluxo operacional, sem decisões manuais difíceis de reproduzir.

## Fluxo padrão

1. Salvar o pacote original em `00_pacote_original/`.
2. Extrair os ZIPs internos para `01_subarquivos_zip/`, separados por família.
3. Extrair o conteúdo textual dos ZIPs internos para `02_extraido_texto/`.
4. Validar estrutura, famílias e amostras.
5. Registrar manifesto em `04_metadados/`.
6. Só então iniciar o processamento em `03_processado/`.

## Regras de nome

- O nome do snapshot é sempre `AAAA-MM`.
- O pacote principal mantém o nome original do download.
- Os arquivos em `02_extraido_texto/` mantêm o nome bruto da Receita.
- Saídas derivadas devem usar nomes legíveis do projeto.

## Status atual

### Snapshot `2026-04`

- pacote original preservado
- ZIPs internos organizados por família
- arquivos textuais extraídos
- manifesto inicial criado
- contrato de leitura documentado no repositório

## Próximos passos operacionais

1. gerar manifesto JSON completo com os utilitários da pipeline
2. registrar checksums das camadas brutas
3. definir o município-alvo do primeiro recorte
4. produzir o primeiro artefato bronze
