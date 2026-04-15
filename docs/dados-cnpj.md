# Organização dos snapshots do CNPJ

## Padrão adotado

Cada snapshot mensal fica em:

```text
dados_brutos/cnpj/AAAA-MM/
```

## Estrutura interna

### Estrutura mínima local

Esta é a estrutura que preferimos manter no computador local:

```text
00_pacote_original/
04_metadados/
```

### Estrutura de trabalho temporária

Esta é a estrutura que os notebooks podem montar no Colab durante o processamento:

```text
00_pacote_original/
01_subarquivos_zip/
02_extraido_texto/
03_processado/
04_metadados/
```

## Motivo da divisão

- `00_pacote_original` preserva a origem exata do download.
- `01_subarquivos_zip` organiza os ZIPs internos da Receita por família.
- `02_extraido_texto` contém os arquivos brutos realmente lidos pela pipeline.
- `03_processado` concentra saídas derivadas do projeto.
- `04_metadados` registra validação, manifesto e observações.

## Retenção da camada intermediária

A pasta `01_subarquivos_zip` é útil durante a primeira extração do snapshot, mas não precisa ser mantida para sempre.

Regra adotada para o ambiente local:

- manter `00_pacote_original`
- manter `04_metadados`
- não manter `02_extraido_texto` por padrão
- não manter `01_subarquivos_zip` por padrão

Isso reduz uso de disco sem perder reprodutibilidade, porque a árvore de trabalho pode ser recriada a partir do pacote original.

## Fluxo preferencial no Colab

Para reduzir uso de disco local, o fluxo preferencial do projeto passa a ser:

- manter localmente apenas o ZIP mensal original
- fazer upload desse ZIP para o Colab
- deixar o próprio notebook gerar a árvore de trabalho no disco temporário da instância
- baixar de volta apenas os artefatos processados que forem necessários

## Famílias esperadas

### Principais para o POC

- `empresas`
- `estabelecimentos`
- `simples`
- domínios (`cnaes`, `motivos`, `municipios`, `naturezas`, `paises`, `qualificacoes`)

### Mantidas, mas fora do foco analítico do v1

- `socios`

## Arquivos extraídos

Os arquivos em `02_extraido_texto` permanecem com o nome bruto da Receita Federal. Isso é intencional, porque:

- facilita rastreabilidade
- reduz ambiguidade durante auditoria
- evita renomeações manuais difíceis de reproduzir

## Validação

O projeto inclui utilitários para:

- classificar ZIPs e arquivos extraídos
- resumir famílias por snapshot
- gerar manifesto JSON
- inspecionar amostras do snapshot

Arquivos principais:

- [pipeline/contratos/layout_cnpj.py](/C:/Users/Thiago/geoBusiness/pipeline/contratos/layout_cnpj.py)
- [pipeline/scripts/inspecionar_snapshot.py](/C:/Users/Thiago/geoBusiness/pipeline/scripts/inspecionar_snapshot.py)
- [pipeline/scripts/gerar_manifesto_snapshot.py](/C:/Users/Thiago/geoBusiness/pipeline/scripts/gerar_manifesto_snapshot.py)
