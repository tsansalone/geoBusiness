# Dados brutos do CNPJ

Esta pasta é ignorada pelo Git e deve armazenar snapshots reais do CNPJ sem alterações destrutivas.

## Convenção

O projeto trabalha com dois contextos diferentes:

- estrutura mínima local, para economizar espaço no computador
- estrutura completa temporária, montada no Colab durante o processamento

### Estrutura mínima local

```text
dados_brutos/
  cnpj/
    AAAA-MM/
      00_pacote_original/
      04_metadados/
```

### Estrutura completa temporária

Quando um notebook prepara o snapshot no Colab, a árvore de trabalho pode incluir:

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

Esta camada é transitória. No fluxo preferencial do Colab, ela pode existir apenas em pasta temporária durante a extração e ser removida no mesmo notebook. Se for criada localmente, pode ser removida depois que `02_extraido_texto/` estiver validada, pois o pacote original continua preservado em `00_pacote_original/`.

### `02_extraido_texto`

Arquivos efetivamente extraídos dos ZIPs internos, ainda no padrão bruto da Receita.

No fluxo atual, essa camada deve existir preferencialmente apenas no disco temporário do Colab.

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
- Quando houver limitação de espaço local, preferir armazenar apenas o ZIP mensal original e deixar a extração para o ambiente temporário do Colab.
