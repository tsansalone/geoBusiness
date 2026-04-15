# Qualidade dos dados

## Riscos conhecidos

### Endereço incompleto

Nem todo estabelecimento possui endereço suficiente para geocodificação precisa.

### Mudança cadastral tardia

O histórico mensal do CNPJ pode refletir atualizações administrativas em momento posterior ao evento real.

### Divergência entre atividade principal e operação real

O CNAE principal é um sinal relevante, mas não garante fidelidade perfeita ao negócio em campo.

## Estratégia de qualidade

- armazenar método de geocodificação
- registrar nível de confiança
- manter flag de revisão
- separar métricas de alta confiança de métricas exploratórias
- reaproveitar cache de geocodificação para evitar consultas repetidas e inconsistentes

## Classificações mínimas

### Alta confiança

Endereço completo, geocodificação precisa e associação espacial consistente.

### Média confiança

Endereço parcialmente resolvido, mas compatível com CEP, bairro ou logradouro.

### Baixa confiança

Sem precisão suficiente para análise fina por hexágono.

## Regras para o produto

- A interface deve exibir a qualidade do recorte.
- Áreas com baixa cobertura não devem sugerir conclusões fortes.
- Comparações devem informar denominadores e volume de observações.
- A primeira camada espacial do POC pode usar geocodificação híbrida com parte dos registros ainda em confiança média ou baixa.
