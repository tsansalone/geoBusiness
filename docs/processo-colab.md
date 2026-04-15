# Processo recomendado no Google Colab

## Objetivo

Usar o Colab como ambiente barato para etapas de processamento pesado antes de servir os dados localmente.

## Fluxo sugerido

1. Fazer upload do snapshot mensal para o disco local da instância Colab.
2. Organizar ou extrair o snapshot em `/content/dados_brutos/cnpj/AAAA-MM/`.
3. Ler os arquivos `.zip` e `.csv` com separador `;`.
4. Validar colunas esperadas com base no contrato do projeto.
5. Filtrar a cidade-alvo.
6. Geocodificar endereços conforme a estratégia escolhida.
7. Gerar agregações por H3.
8. Exportar artefatos compactos para `parquet` ou `csv`.
9. Baixar os artefatos gerados ou transferi-los para o ambiente local do projeto.

## Boas práticas

- Processar um mês por vez e consolidar no final.
- Salvar checkpoints intermediários.
- Registrar versão do notebook e parâmetros usados.
- Não commitar snapshots brutos grandes no Git.
- Preferir o disco local da instância (`/content`) em vez de ocupar espaço no Google Drive.

## Artefatos esperados

- `silver_estabelecimentos.parquet`
- `silver_empresas.parquet`
- `gold_hex_segmento_mes.parquet`
- `qualidade_geocodificacao.csv`

## Materiais incluídos

- [notebooks/geo_business_poc_colab.ipynb](</C:/Users/Thiago/geoBusiness/notebooks/geo_business_poc_colab.ipynb>)
- [pipeline/contratos/layout_cnpj.py](</C:/Users/Thiago/geoBusiness/pipeline/contratos/layout_cnpj.py>)
