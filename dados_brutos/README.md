# Dados brutos do CNPJ

Esta pasta é ignorada pelo Git e deve armazenar snapshots reais do CNPJ sem alterações destrutivas.

## Convenção

```text
dados_brutos/
  cnpj/
    AAAA-MM/
      00_pacote_original/
      01_subarquivos_zip/
      02_extraido_texto/
      03_processado/
      04_metadados/
```

## Camadas

### `00_pacote_original`

Pacote exatamente como foi baixado da Receita Federal.

### `01_subarquivos_zip`

ZIPs internos organizados por família:

- `empresas`
- `estabelecimentos`
- `socios`
- `simples`
- `dominios`

Esta camada é transitória. Depois que `02_extraido_texto/` estiver validada, a pasta pode ser removida para economizar espaço, pois o pacote original continua preservado em `00_pacote_original/`.

### `02_extraido_texto`

Arquivos efetivamente extraídos dos ZIPs internos, ainda no padrão bruto da Receita.

### `03_processado`

Saídas operacionais da pipeline:

- `bronze`
- `silver`
- `gold`

### `04_metadados`

Manifestos, checksums, observações e resultados de validação do snapshot.

## Regras

- Não renomear os arquivos brutos da Receita dentro de `02_extraido_texto`.
- Não editar arquivos de origem manualmente.
- Preferir artefatos derivados em `03_processado`.
- Registrar toda observação importante em `04_metadados`.
