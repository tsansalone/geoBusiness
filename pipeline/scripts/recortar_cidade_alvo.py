from __future__ import annotations

import argparse
from pathlib import Path

from pipeline.contratos.layout_cnpj import CAMADAS_PROCESSAMENTO


CAMADA_RECORTE = CAMADAS_PROCESSAMENTO[0]

TEXTO_EXEMPLO = """
Este script é um ponto de entrada para o recorte da cidade-alvo.

Fluxo esperado:
1. Ler os arquivos da família Estabelecimentos e Empresas.
2. Filtrar pela UF e pelo código do município desejado.
3. Derivar chaves completas do CNPJ.
4. Persistir o recorte em processado/recorte.
5. Evoluir as próximas transformações em processado/preparado e processado/analitico.

Observação:
No ambiente atual o script fica como esqueleto documentado, pois a execução real
dependerá de Python + bibliotecas analíticas no Colab ou no ambiente local.
""".strip()


def main() -> None:
    parser = argparse.ArgumentParser(description="Esqueleto para gerar o recorte da cidade-alvo.")
    parser.add_argument("--snapshot-mes", required=True, help="Snapshot no formato AAAA-MM.")
    parser.add_argument("--municipio", required=True, help="Código do município no domínio do CNPJ.")
    parser.add_argument("--saida", default="dados_brutos/cnpj", help="Raiz de saída dos processados.")
    args = parser.parse_args()

    destino = Path(args.saida) / args.snapshot_mes / "processado" / CAMADA_RECORTE / "README-recorte.txt"
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(
        f"snapshot_mes={args.snapshot_mes}\nmunicipio={args.municipio}\n\n{TEXTO_EXEMPLO}\n",
        encoding="utf-8",
    )
    print(f"Arquivo guia salvo em: {destino}")


if __name__ == "__main__":
    main()
