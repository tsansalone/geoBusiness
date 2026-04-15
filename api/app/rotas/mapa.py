from fastapi import APIRouter, HTTPException, Query

from app.esquemas.modelos import HexagonoMetrico, RespostaMapa
from app.servicos.repositorio_dados import obter_cidade, obter_fonte_dados, obter_segmento, listar_hexagonos

router = APIRouter(prefix="/mapa", tags=["mapa"])


@router.get("/metricas-hex", response_model=RespostaMapa)
def obter_metricas_hex(
    segmento: str | None = Query(default=None, description="Identificador do segmento."),
    metrica: str = Query(default="ativos", description="Métrica exibida no mapa.")
) -> RespostaMapa:
    try:
        segmento_obj = obter_segmento(segmento)
    except KeyError as erro:
        raise HTTPException(status_code=404, detail=str(erro)) from erro

    hexagonos_convertidos: list[HexagonoMetrico] = []
    valores: list[float] = []

    for hexagono in listar_hexagonos():
        recorte = hexagono["segmentos"][segmento_obj["id"]]
        if metrica not in recorte:
            raise HTTPException(status_code=400, detail=f"Métrica inválida: {metrica}")

        valor = float(recorte[metrica])
        valores.append(valor)
        hexagonos_convertidos.append(
            HexagonoMetrico(
                hex_id=hexagono["hex_id"],
                nome_area=hexagono["nome_area"],
                centro_x=hexagono["centro_x"],
                centro_y=hexagono["centro_y"],
                valor=valor,
                confianca_geografica=str(recorte["confianca_geografica"]),
                resumo={
                    "ativos": recorte["ativos"],
                    "baixadas_atuais": recorte.get("baixadas_atuais", 0),
                    "aberturas_24m": recorte["aberturas_24m"],
                    "baixas_24m": recorte["baixas_24m"],
                    "taxa_fechamento": recorte["taxa_fechamento"],
                    "densidade_segmento": recorte["densidade_segmento"],
                    "densidade_complementares": recorte["densidade_complementares"],
                    "idade_mediana_meses": recorte["idade_mediana_meses"],
                    "percentil_saturacao": recorte["percentil_saturacao"],
                    "confianca_geografica": recorte["confianca_geografica"],
                }
            )
        )

    media = sum(valores) / len(valores)

    return RespostaMapa(
        cidade=obter_cidade(),
        segmento_id=segmento_obj["id"],
        metrica=metrica,
        media_cidade=round(media, 2),
        maior_valor=max(valores),
        fonte_dados=obter_fonte_dados(),
        hexagonos=hexagonos_convertidos
    )
