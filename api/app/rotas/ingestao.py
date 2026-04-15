from fastapi import APIRouter

from app.esquemas.modelos import RequisicaoSnapshot, RespostaIngestao

router = APIRouter(prefix="/ingestao", tags=["ingestao"])


@router.post("/snapshot-cnpj", response_model=RespostaIngestao)
def registrar_snapshot(requisicao: RequisicaoSnapshot) -> RespostaIngestao:
    return RespostaIngestao(
        status="registrado",
        mensagem="Snapshot recebido para processamento assíncrono na pipeline.",
        proximo_passo="Executar notebook ou job da etapa de recorte para carregar o snapshot informado.",
        snapshot_mes=requisicao.snapshot_mes
    )
