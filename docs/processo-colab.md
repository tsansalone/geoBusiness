# Processo recomendado no Google Colab

## Objetivo

Usar o Colab como ambiente barato para etapas de processamento pesado antes de servir os dados localmente.

O fluxo recomendado passa a ser: manter no Google Drive apenas o ZIP mensal original e usar o disco temporário da instância Colab para extração e processamento.

## Fluxo sugerido

1. Salvar o ZIP mensal original no Google Drive.
2. Montar o Drive no Colab.
3. Copiar apenas o ZIP do snapshot alvo para o disco local da instância.
4. Executar o notebook para mover o ZIP para `original` e extrair os arquivos para `extraido`.
5. Ler os arquivos texto com separador `;`.
6. Validar colunas esperadas com base no contrato do projeto.
7. Filtrar a cidade-alvo.
8. Geocodificar endereços conforme a estratégia escolhida.
9. Gerar agregações por H3.
10. Exportar artefatos compactos para `parquet` ou `csv`, mantendo a organização em `processado/recorte`, `processado/preparado` e `processado/analitico`.
11. Baixar apenas os artefatos derivados que precisarem voltar para o ambiente local.

## Boas práticas

- Processar um mês por vez e consolidar no final.
- Salvar checkpoints intermediários.
- Registrar versão do notebook e parâmetros usados.
- Não commitar snapshots brutos grandes no Git.
- Usar o Google Drive apenas como armazenamento do ZIP bruto.
- Preferir o disco local da instância (`/content`) para todas as etapas temporárias de extração e processamento.
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
