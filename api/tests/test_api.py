from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_rota_saude():
    resposta = client.get("/saude")
    assert resposta.status_code == 200
    assert resposta.json()["status"] == "ok"


def test_rota_segmentos():
    resposta = client.get("/segmentos")
    assert resposta.status_code == 200
    assert len(resposta.json()) >= 3


def test_rota_mapa():
    resposta = client.get("/mapa/metricas-hex", params={"segmento": "cafeterias", "metrica": "ativos"})
    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["segmento_id"] == "cafeterias"
    assert len(corpo["hexagonos"]) == 6


def test_rota_area():
    resposta = client.get("/areas/89a81000003ffff", params={"segmento": "cafeterias"})
    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["nome_area"] == "Bela Vista Leste"
    assert corpo["metricas"]["ativos"] == 29


def test_rota_comparacao():
    resposta = client.get(
        "/comparar",
        params={"hex_ids": "89a81000003ffff,89a81000005ffff", "segmento": "cafeterias"}
    )
    assert resposta.status_code == 200
    assert len(resposta.json()["areas"]) == 2


def test_rota_qualidade():
    resposta = client.get("/qualidade-dados")
    assert resposta.status_code == 200
    assert resposta.json()["snapshot_referencia"] == "2026-01"


def test_rota_ingestao():
    resposta = client.post(
        "/ingestao/snapshot-cnpj",
        json={
            "snapshot_mes": "2026-02",
            "cidade": "São Paulo - SP",
            "origem_arquivos": "drive://cnpj/2026-02"
        }
    )
    assert resposta.status_code == 200
    assert resposta.json()["status"] == "registrado"
