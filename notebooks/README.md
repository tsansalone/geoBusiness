# Notebooks do projeto

Os notebooks desta pasta servem como ponte entre o ZIP mensal original do CNPJ e os artefatos usados pelo POC.

## Notebooks incluídos

- `01_inspecao_snapshot_cnpj.ipynb`
- `02_recorte_cidade_e_exportacao.ipynb`

## Uso recomendado

1. Abrir no Google Colab.
2. Montar o Google Drive e manter nele apenas o ZIP mensal original.
3. Deixar que o próprio notebook copie esse ZIP para `/content` e prepare o snapshot em `/content/dados_brutos/cnpj/AAAA-MM/`.
4. Validar famílias, amostras e colunas.
5. No `02`, processar uma família por vez, persistindo partes em disco em vez de carregar o snapshot inteiro em RAM.
6. Produzir recortes processados para a cidade-alvo e evoluir as saídas em `processado/recorte`, `processado/preparado` e `processado/analitico`.

## Observação

Os notebooks foram escritos em PT-BR e assumem um fluxo de trabalho com ZIP bruto no Google Drive e processamento temporário em `/content`, sem exigir que as camadas extraídas sejam mantidas no seu computador.
