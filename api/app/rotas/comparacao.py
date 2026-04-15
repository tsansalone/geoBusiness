from fastapi import APIRouter, HTTPException, Query

from app.esquemas.modelos import ItemComparacao, RespostaComparacao
from app.servicos.repositorio_exemplo import obter_cidade, obter_hexagono, obter_segmento

router = APIRouter(prefix="/comparar", tags=["comparacao"])


@router.get("", response_model=RespostaComparacao)
def comparar_areas(
    hex_ids: str = Query(..., description="Lista de hexágonos separados por vírgula."),
    segmento: str | None = Query(default=None, description="Identificador do segmento.")
) -> RespostaComparacao:
    try:
        segmento_obj = obter_segmento(segmento)
    except KeyError as erro:
        raise HTTPException(status_code=404, detail=str(erro)) from erro

    itens: list[ItemComparacao] = []
    for hex_id in [item.strip() for item in hex_ids.split(",") if item.strip()]:
        try:
            hexagono = obter_hexagono(hex_id)
        except KeyError as erro:
            raise HTTPException(status_code=404, detail=str(erro)) from erro

        recorte = hexagono["segmentos"][segmento_obj["id"]]
        itens.append(
            ItemComparacao(
                hex_id=hexagono["hex_id"],
                nome_area=hexagono["nome_area"],
                ativos=recorte["ativos"],
                aberturas_24m=recorte["aberturas_24m"],
                baixas_24m=recorte["baixas_24m"],
                taxa_fechamento=recorte["taxa_fechamento"],
                densidade_segmento=recorte["densidade_segmento"],
                percentil_saturacao=recorte["percentil_saturacao"],
                confianca_geografica=recorte["confianca_geografica"]
            )
        )

    return RespostaComparacao(cidade=obter_cidade(), segmento_id=segmento_obj["id"], areas=itens)
