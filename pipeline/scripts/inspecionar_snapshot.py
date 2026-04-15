from __future__ import annotations

import argparse
import json
from pathlib import Path

from pipeline.contratos.layout_cnpj import (
    gerar_resumo_familias,
    linhas_amostra,
    listar_arquivos_extraidos,
    validar_estrutura_snapshot,
)


def main() -> None:
    parser = argparse.ArgumentParser(description="Inspeciona um snapshot do CNPJ já organizado no padrão do projeto.")
    parser.add_argument("--raiz-dados", default="dados_brutos", help="Pasta raiz que contém a pasta cnpj/.")
    parser.add_argument("--snapshot-mes", required=True, help="Snapshot no formato AAAA-MM.")
    parser.add_argument("--saida-json", help="Arquivo opcional para salvar o resumo em JSON.")
    args = parser.parse_args()

    erros = validar_estrutura_snapshot(args.raiz_dados, args.snapshot_mes)
    resumo = gerar_resumo_familias(args.raiz_dados, args.snapshot_mes)

    amostras: dict[str, list[str]] = {}
    for familia in ("empresas", "estabelecimentos", "simples", "dominios_cnaes", "dominios_municipios"):
        arquivos = listar_arquivos_extraidos(args.raiz_dados, args.snapshot_mes, familia)
        if arquivos:
            amostras[familia] = linhas_amostra(arquivos[0], quantidade=2)

    payload = {
        "snapshot_mes": args.snapshot_mes,
        "erros": erros,
        "resumo_familias": resumo,
        "amostras": amostras,
    }

    if args.saida_json:
        destino = Path(args.saida_json)
        destino.parent.mkdir(parents=True, exist_ok=True)
        destino.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
