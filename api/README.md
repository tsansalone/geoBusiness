# API do GeoBusiness

## Objetivo

Servir dados analíticos do POC para a interface web e para integrações internas.

## Rotas disponíveis

- `GET /saude`
- `GET /segmentos`
- `GET /mapa/metricas-hex`
- `GET /areas/{hex_id}`
- `GET /comparar`
- `GET /qualidade-dados`
- `POST /ingestao/snapshot-cnpj`

## Execução local

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Observação

No estágio atual a API usa dados sintéticos coerentes com o POC. A próxima etapa é conectar os artefatos processados do pipeline às consultas reais.
