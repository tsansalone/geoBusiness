from pathlib import Path

from pipeline.contratos.layout_cnpj import classificar_extraido, classificar_zip, gerar_resumo_familias


def test_classificar_zip_empresas():
    assert classificar_zip("Empresas0.zip") == "empresas"


def test_classificar_zip_dominio():
    assert classificar_zip("Municipios.zip") == "dominios_municipios"


def test_classificar_extraido_estabelecimentos():
    assert classificar_extraido("K3241.K03200Y0.D60411.ESTABELE") == "estabelecimentos"


def test_gerar_resumo_sem_snapshot_retorna_zeros(tmp_path: Path):
    resumo = gerar_resumo_familias(tmp_path, "2099-01")
    assert resumo["empresas"]["quantidade_arquivos"] == 0
