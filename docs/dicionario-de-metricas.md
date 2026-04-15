# Dicionário de métricas

## Ativos atuais

Quantidade de estabelecimentos com situação cadastral ativa no recorte selecionado.

## Aberturas por mês

Contagem de estabelecimentos cuja `data_inicio_atividade` ou primeiro aparecimento no histórico indica entrada no período analisado.

## Baixas por mês

Contagem de estabelecimentos que transitaram para `baixada` no período.

## Churn líquido

Diferença entre aberturas e baixas no período.

Fórmula:

`aberturas - baixas`

## Taxa de fechamento

Relação entre baixas do período e a base ativa média do período.

Fórmula de referência:

`baixas_periodo / media_ativos_periodo`

## Idade mediana

Mediana, em meses, entre a data de início da atividade e a data de referência do recorte.

## Sobrevivência por coorte

Percentual de estabelecimentos de uma mesma coorte de abertura que continuam ativos após determinado número de meses.

## Densidade do mesmo segmento

Número de estabelecimentos do segmento por hexágono.

## Presença de segmentos complementares

Indicador agregado de atividades que normalmente reforçam a atratividade local do segmento analisado.

## Percentil de saturação

Posição relativa do hexágono em relação aos demais hexágonos da cidade no mesmo segmento.

## Confiabilidade geográfica

Indicador derivado da qualidade da geocodificação:

- alta
- média
- baixa

Essa métrica não indica desempenho do negócio. Ela informa a confiança do posicionamento espacial.
