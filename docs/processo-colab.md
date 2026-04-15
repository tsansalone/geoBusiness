# Processo recomendado no Google Colab

## Objetivo

Usar o Colab como ambiente barato para etapas de processamento pesado antes de servir os dados localmente.

O fluxo recomendado passa a ser: manter localmente apenas o ZIP mensal original e usar o disco temporário da instância Colab para extração e processamento.

## Fluxo sugerido

1. Fazer upload do ZIP mensal original para o disco local da instância Colab.
2. Executar o notebook para mover o ZIP para `original` e extrair os arquivos para `extraido`.
3. Ler os arquivos texto com separador `;`.
4. Validar colunas esperadas com base no contrato do projeto.
5. Filtrar a cidade-alvo.
6. Geocodificar endereços conforme a estratégia escolhida.
7. Gerar agregações por H3.
8. Exportar artefatos compactos para `parquet` ou `csv`, mantendo a organização em `processado/recorte`, `processado/preparado` e `processado/analitico`.
9. Baixar apenas os artefatos derivados que precisarem voltar para o ambiente local.

## Boas práticas

- Processar um mês por vez e consolidar no final.
- Salvar checkpoints intermediários.
- Registrar versão do notebook e parâmetros usados.
- Não commitar snapshots brutos grandes no Git.
- Preferir o disco local da instância (`/content`) em vez de ocupar espaço no Google Drive.
- Evitar manter `extraido` no computador local quando o objetivo for apenas produzir artefatos processados.

## Artefatos esperados

- `processado/recorte/estabelecimentos_municipio.parquet`
- `processado/recorte/empresas_municipio.parquet`
- `processado/preparado/estabelecimentos_preparados.parquet`
- `processado/analitico/hex_segmento_mes.parquet`
- `processado/analitico/qualidade_geocodificacao.csv`

## Materiais incluídos

- [notebooks/01_inspecao_snapshot_cnpj.ipynb](</C:/Users/Thiago/geoBusiness/notebooks/01_inspecao_snapshot_cnpj.ipynb>)
- [notebooks/02_recorte_cidade_e_exportacao.ipynb](</C:/Users/Thiago/geoBusiness/notebooks/02_recorte_cidade_e_exportacao.ipynb>)
- [pipeline/contratos/layout_cnpj.py](</C:/Users/Thiago/geoBusiness/pipeline/contratos/layout_cnpj.py>)
