from fastapi import APIRouter, HTTPException, Query

from app.esquemas.modelos import MotivoBaixa, RespostaArea, SerieTemporal
from app.servicos.repositorio_dados import (
    obter_detalhe_area,
    obter_fonte_dados,
    obter_hexagono,
    obter_segmento,
)

router = APIRouter(prefix="/areas", tags=["areas"])


@router.get("/{hex_id}", response_model=RespostaArea)
def obter_area(
    hex_id: str,
    segmento: str | None = Query(default=None, description="Identificador do segmento.")
) -> RespostaArea:
    try:
        segmento_obj = obter_segmento(segmento)
        hexagono = obter_hexagono(hex_id)
        detalhe = obter_detalhe_area(hex_id)
    except KeyError as erro:
        raise HTTPException(status_code=404, detail=str(erro)) from erro

    metricas = hexagono["segmentos"][segmento_obj["id"]]
    return RespostaArea(
        hex_id=hexagono["hex_id"],
        nome_area=hexagono["nome_area"],
        segmento_id=segmento_obj["id"],
        fonte_dados=obter_fonte_dados(),
        metricas=metricas,
        series=[
            SerieTemporal(nome="aberturas", valores=detalhe["serie_aberturas"]),
            SerieTemporal(nome="baixas", valores=detalhe["serie_baixas"])
        ],
        motivos_baixa=[MotivoBaixa(**item) for item in detalhe["motivos_baixa"]],
        observacao=detalhe["observacao"],
        hexagonos_vizinhos=hexagono["vizinhos"]
    )
