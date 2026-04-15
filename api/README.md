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
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Observação

No estágio atual a API usa fallback sintético quando a camada `processado/analitico` ainda não existe localmente, e passa a ler os parquets reais automaticamente quando esses artefatos estão disponíveis.
