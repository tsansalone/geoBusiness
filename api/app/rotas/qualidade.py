from fastapi import APIRouter

from app.esquemas.modelos import RespostaQualidade
from app.servicos.repositorio_exemplo import obter_qualidade_dados

router = APIRouter(prefix="/qualidade-dados", tags=["qualidade"])


@router.get("", response_model=RespostaQualidade)
def qualidade_dados() -> RespostaQualidade:
    return RespostaQualidade(**obter_qualidade_dados())
