# Operação de snapshots do CNPJ

## Objetivo

Garantir que cada snapshot mensal siga sempre o mesmo fluxo operacional, sem decisões manuais difíceis de reproduzir.

## Fluxo padrão

1. Salvar o pacote original em `original/`.
2. Extrair o conteúdo textual para `extraido/`.
3. Validar estrutura, famílias e amostras.
4. Registrar manifesto em `metadados/`.
5. Só então iniciar o processamento em `processado/`.

Observação:
Em fluxos automáticos no Colab, os ZIPs internos podem existir apenas em pasta temporária e ser removidos no mesmo notebook.

## Regras de nome

- O nome do snapshot é sempre `AAAA-MM`.
- O pacote principal mantém o nome original do download.
- Os arquivos em `extraido/` mantêm o nome bruto da Receita.
- Saídas derivadas devem usar nomes legíveis do projeto.
- Dentro de `processado/`, usar camadas com nomes descritivos: `recorte`, `preparado` e `analitico`.
- `subarquivos_zip/` não precisa existir como pasta persistente quando a extração for feita diretamente a partir do ZIP principal em ambiente temporário.

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
4. produzir o primeiro artefato de recorte
