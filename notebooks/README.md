# Notebooks do projeto

Os notebooks desta pasta servem como ponte entre o ZIP mensal original do CNPJ e os artefatos usados pelo POC.

## Notebooks incluídos

- `01_inspecao_snapshot_cnpj.ipynb`
- `02_recorte_cidade_e_exportacao.ipynb`

## Uso recomendado

1. Abrir no Google Colab.
2. Fazer upload apenas do ZIP mensal original para `/content/uploads/`.
3. Deixar que o próprio notebook prepare o snapshot em `/content/dados_brutos/cnpj/AAAA-MM/`.
4. Validar famílias, amostras e colunas.
5. Produzir recortes processados para a cidade-alvo e evoluir as saídas em `processado/recorte`, `processado/preparado` e `processado/analitico`.

## Observação

Os notebooks foram escritos em PT-BR e assumem um fluxo de trabalho temporário em `/content`, sem exigir que as camadas extraídas sejam mantidas no seu computador.
