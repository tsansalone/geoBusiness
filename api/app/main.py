from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.rotas.areas import router as areas_router
from app.rotas.comparacao import router as comparacao_router
from app.rotas.ingestao import router as ingestao_router
from app.rotas.mapa import router as mapa_router
from app.rotas.qualidade import router as qualidade_router
from app.rotas.segmentos import router as segmentos_router

app = FastAPI(
    title="GeoBusiness API",
    version="0.1.0",
    description="API do POC GeoBusiness para exploração analítica do histórico do CNPJ."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/saude", tags=["saude"])
def saude() -> dict[str, str]:
    return {"status": "ok", "servico": "geobusiness-api"}


app.include_router(segmentos_router)
app.include_router(mapa_router)
app.include_router(areas_router)
app.include_router(comparacao_router)
app.include_router(qualidade_router)
app.include_router(ingestao_router)
