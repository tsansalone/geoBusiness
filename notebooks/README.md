# Notebooks do projeto

Os notebooks desta pasta servem como ponte entre o ZIP mensal original do CNPJ e os artefatos usados pelo POC.

## Notebooks incluídos

- `01_inspecao_snapshot_cnpj.ipynb`
- `02_recorte_cidade_e_exportacao.ipynb`
- `03_preparacao_recorte.ipynb`
- `04_geocodificacao_hibrida.ipynb`
- `05_agregacao_espacial_h3.ipynb`

## Uso recomendado

1. Abrir no Google Colab.
2. Montar o Google Drive e manter nele apenas o ZIP mensal original.
3. Deixar que o próprio notebook copie esse ZIP para `/content` e prepare o snapshot em `/content/dados_brutos/cnpj/AAAA-MM/`.
4. Validar famílias, amostras e colunas.
5. No `02`, processar uma família por vez, persistindo partes em disco em vez de carregar o snapshot inteiro em RAM.
6. No `03`, preparar a pasta `processado/recorte`, subir os `.parquet` do recorte quando necessário e então transformar `recorte` em `preparado`, derivando chaves, datas e status.
7. No `04`, preparar a pasta `processado/preparado`, subir os artefatos do `03` quando necessário e então aplicar geocodificação híbrida barata com cache persistente e retomada segura.
8. No `05`, agregar em H3 e produzir a camada `analitico`.

## Observação

Os notebooks foram escritos em PT-BR e assumem um fluxo de trabalho com ZIP bruto no Google Drive e processamento temporário em `/content`, sem exigir que as camadas extraídas sejam mantidas no seu computador. No `04`, o cache e o estado de progresso podem ser persistidos no Google Drive para retomada após reconexões.

As saídas esperadas desta sequência são:

- `processado/recorte/*.parquet`
- `processado/preparado/*.parquet`
- `processado/preparado/qualidade_geocodificacao.csv`
- `processado/analitico/*.parquet`
- `processado/analitico/qualidade_espacial_resumo.json`
