from fastapi import APIRouter

from app.esquemas.modelos import Segmento
from app.servicos.repositorio_dados import listar_segmentos

router = APIRouter(prefix="/segmentos", tags=["segmentos"])


@router.get("", response_model=list[Segmento])
def obter_segmentos() -> list[Segmento]:
    return [Segmento(**segmento) for segmento in listar_segmentos()]
