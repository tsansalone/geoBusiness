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
      original/
      metadados/
```

### Estrutura completa temporária

Quando um notebook prepara o snapshot no Colab, a árvore de trabalho pode incluir:

```text
dados_brutos/
  cnpj/
    AAAA-MM/
      original/
      subarquivos_zip/
      extraido/
      processado/
      metadados/
```

## Camadas

### `original`

Pacote exatamente como foi baixado da Receita Federal.

### `subarquivos_zip`

ZIPs internos organizados por família:

- `empresas`
- `estabelecimentos`
- `socios`
- `simples`
- `dominios`

Esta camada é transitória. No fluxo preferencial do Colab, ela pode existir apenas em pasta temporária durante a extração e ser removida no mesmo notebook. Se for criada localmente, pode ser removida depois que `extraido/` estiver validada, pois o pacote original continua preservado em `original/`.

### `extraido`

Arquivos efetivamente extraídos dos ZIPs internos, ainda no padrão bruto da Receita.

No fluxo atual, essa camada deve existir preferencialmente apenas no disco temporário do Colab.

### `processado`

Saídas operacionais da pipeline:

- `recorte`: primeiro recorte persistido do snapshot, ainda próximo da estrutura original e já limitado ao escopo de trabalho do projeto
- `preparado`: tabelas tratadas, com chaves consistentes, domínios resolvidos e trilha de qualidade
- `analitico`: artefatos prontos para consumo da API e da interface, normalmente já agregados para leitura do produto

### `metadados`

Manifestos, checksums, observações e resultados de validação do snapshot.

## Regras

- Não renomear os arquivos brutos da Receita dentro de `extraido`.
- Não editar arquivos de origem manualmente.
- Preferir artefatos derivados em `processado`.
- Registrar toda observação importante em `metadados`.
- Quando houver limitação de espaço local, preferir armazenar apenas o ZIP mensal original e deixar a extração para o ambiente temporário do Colab.
