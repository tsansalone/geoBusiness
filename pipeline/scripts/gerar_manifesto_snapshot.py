from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

from pipeline.contratos.layout_cnpj import gerar_resumo_familias, raiz_snapshot, validar_estrutura_snapshot


def main() -> None:
    parser = argparse.ArgumentParser(description="Gera um manifesto JSON para um snapshot organizado do CNPJ.")
    parser.add_argument("--raiz-dados", default="dados_brutos", help="Pasta raiz que contém a pasta cnpj/.")
    parser.add_argument("--snapshot-mes", required=True, help="Snapshot no formato AAAA-MM.")
    args = parser.parse_args()

    base = raiz_snapshot(args.raiz_dados, args.snapshot_mes)
    manifesto = {
        "snapshot_mes": args.snapshot_mes,
        "gerado_em_utc": datetime.now(timezone.utc).isoformat(),
        "raiz_snapshot": str(base),
        "status_validacao": "ok",
        "erros_validacao": validar_estrutura_snapshot(args.raiz_dados, args.snapshot_mes),
        "resumo_familias": gerar_resumo_familias(args.raiz_dados, args.snapshot_mes),
        "camadas": {
            "pacote_original": "00_pacote_original",
            "subarquivos_zip": "01_subarquivos_zip",
            "arquivos_extraidos": "02_extraido_texto",
            "processado": "03_processado",
            "metadados": "04_metadados",
        },
    }
    if manifesto["erros_validacao"]:
        manifesto["status_validacao"] = "incompleto"

    destino = base / "04_metadados" / "manifest.json"
    destino.write_text(json.dumps(manifesto, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Manifesto salvo em: {destino}")


if __name__ == "__main__":
    main()
