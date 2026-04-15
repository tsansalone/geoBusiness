"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { cidadePadrao, detalhesArea, hexagonos, qualidadeDados, segmentos } from "../lib/dados-exemplo";
import { formatarDecimal, formatarInteiro, formatarPercentual } from "../lib/formatadores";

function criarPontosHexagono(centroX: number, centroY: number, raio = 42): string {
  const pontos = Array.from({ length: 6 }, (_, indice) => {
    const angulo = (Math.PI / 3) * indice - Math.PI / 6;
    const x = centroX + raio * Math.cos(angulo);
    const y = centroY + raio * Math.sin(angulo);
    return `${x},${y}`;
  });
  return pontos.join(" ");
}

export function PainelPrincipal() {
  const [segmentoSelecionado, setSegmentoSelecionado] = useState(segmentos[0].id);
  const [metricaSelecionada, setMetricaSelecionada] = useState<"ativos" | "aberturas24m" | "baixas24m" | "taxaFechamento" | "densidadeSegmento">("ativos");
  const [hexSelecionado, setHexSelecionado] = useState(hexagonos[2].hexId);

  const segmentoDefasado = useDeferredValue(segmentoSelecionado);
  const recorteHex = hexagonos.map((hexagono) => ({
    ...hexagono,
    metricas: hexagono.segmentos[segmentoDefasado]
  }));

  const detalhe = recorteHex.find((hexagono) => hexagono.hexId === hexSelecionado) ?? recorteHex[0];
  const detalheExpandido = detalhesArea[detalhe.hexId];
  const mediaAtivos = recorteHex.reduce((acumulado, item) => acumulado + item.metricas.ativos, 0) / recorteHex.length;
  const mediaFechamento =
    recorteHex.reduce((acumulado, item) => acumulado + item.metricas.taxaFechamento, 0) / recorteHex.length;
  const comparacao = [...recorteHex]
    .sort((a, b) => b.metricas.ativos - a.metricas.ativos)
    .slice(0, 3);

  return (
    <main className="pagina">
      <section className="hero">
        <div className="hero__marca">GeoBusiness</div>
        <div className="hero__conteudo">
          <div>
            <p className="hero__kicker">POC analítico em PT-BR</p>
            <h1>Mapa de evidências para decidir onde abrir um negócio.</h1>
            <p className="hero__texto">
              Explore padrões históricos de abertura, baixa, sobrevivência e densidade por segmento usando o
              histórico do CNPJ como base principal.
            </p>
          </div>
          <div className="hero__dados">
            <div>
              <span className="etiqueta">Cidade</span>
              <strong>{cidadePadrao}</strong>
            </div>
            <div>
              <span className="etiqueta">Snapshot</span>
              <strong>{qualidadeDados.snapshotReferencia}</strong>
            </div>
            <div>
              <span className="etiqueta">Cobertura geocodificada</span>
              <strong>{formatarPercentual(qualidadeDados.coberturaGeocodificacao)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="filtros">
          <div className="bloco">
            <span className="etiqueta">Segmento</span>
            <div className="lista-segmentos">
              {segmentos.map((segmento) => (
                <button
                  key={segmento.id}
                  className={segmentoSelecionado === segmento.id ? "chip chip--ativo" : "chip"}
                  onClick={() =>
                    startTransition(() => {
                      setSegmentoSelecionado(segmento.id);
                    })
                  }
                >
                  <span>{segmento.nome}</span>
                  <small>CNAE {segmento.cnaePrincipal}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="bloco">
            <span className="etiqueta">Métrica do mapa</span>
            <div className="lista-metricas">
              {[
                ["ativos", "Ativos atuais"],
                ["aberturas24m", "Aberturas em 24 meses"],
                ["baixas24m", "Baixas em 24 meses"],
                ["taxaFechamento", "Taxa de fechamento"],
                ["densidadeSegmento", "Densidade do segmento"]
              ].map(([valor, rotulo]) => (
                <button
                  key={valor}
                  className={metricaSelecionada === valor ? "linha linha--ativa" : "linha"}
                  onClick={() => setMetricaSelecionada(valor as typeof metricaSelecionada)}
                >
                  {rotulo}
                </button>
              ))}
            </div>
          </div>

          <div className="bloco bloco--resumo">
            <span className="etiqueta">Leitura rápida</span>
            <p>
              <strong>{segmentos.find((item) => item.id === segmentoDefasado)?.nome}</strong> apresenta média de{" "}
              <strong>{formatarDecimal(mediaAtivos)}</strong> ativos por célula e taxa média de fechamento de{" "}
              <strong>{formatarPercentual(mediaFechamento)}</strong>.
            </p>
          </div>
        </aside>

        <div className="superficie">
          <section className="faixa-kpis">
            <article>
              <span className="etiqueta">Ativos médios</span>
              <strong>{formatarDecimal(mediaAtivos)}</strong>
            </article>
            <article>
              <span className="etiqueta">Área em foco</span>
              <strong>{detalhe.nomeArea}</strong>
            </article>
            <article>
              <span className="etiqueta">Percentil de saturação</span>
              <strong>{detalhe.metricas.percentilSaturacao}</strong>
            </article>
            <article>
              <span className="etiqueta">Confiabilidade</span>
              <strong>{detalhe.metricas.confiancaGeografica}</strong>
            </article>
          </section>

          <section className="painel-mapa">
            <div className="painel-mapa__cabecalho">
              <div>
                <span className="etiqueta">Explorador de segmentos</span>
                <h2>Distribuição espacial e histórico recente</h2>
              </div>
              <p>
                Clique em uma célula para abrir o detalhe da área e comparar sinais de oportunidade, volatilidade e
                saturação.
              </p>
            </div>

            <div className="mapa-shell">
              <svg viewBox="80 70 380 220" className="mapa-svg" role="img" aria-label="Mapa hexagonal do POC">
                <defs>
                  <linearGradient id="bg-grid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10261b" />
                    <stop offset="100%" stopColor="#15382a" />
                  </linearGradient>
                </defs>
                <rect x="80" y="70" width="380" height="220" rx="26" fill="url(#bg-grid)" />
                {recorteHex.map((hexagono) => {
                  const valor = hexagono.metricas[metricaSelecionada];
                  const intensidade =
                    typeof valor === "number" && valor <= 1 ? Math.max(0.18, valor) : Math.min(Number(valor) / 30, 1);
                  const selecionado = detalhe.hexId === hexagono.hexId;
                  return (
                    <g key={hexagono.hexId}>
                      <polygon
                        points={criarPontosHexagono(hexagono.centroX, hexagono.centroY)}
                        fill={`rgba(240, 176, 96, ${0.2 + intensidade * 0.65})`}
                        stroke={selecionado ? "#fff4d8" : "rgba(255,255,255,0.15)"}
                        strokeWidth={selecionado ? 3 : 1.5}
                        onClick={() => setHexSelecionado(hexagono.hexId)}
                        style={{ cursor: "pointer" }}
                      />
                      <text x={hexagono.centroX} y={hexagono.centroY - 6} textAnchor="middle" className="mapa__valor">
                        {typeof valor === "number" && valor < 1 ? formatarPercentual(valor) : formatarInteiro(Number(valor))}
                      </text>
                      <text x={hexagono.centroX} y={hexagono.centroY + 14} textAnchor="middle" className="mapa__rotulo">
                        {hexagono.nomeArea}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </section>

          <section className="grade-inferior">
            <article className="painel">
              <span className="etiqueta">Detalhe da área</span>
              <h3>{detalhe.nomeArea}</h3>
              <p className="texto-suporte">{detalheExpandido.observacao}</p>
              <div className="metricas-grid">
                <div><small>Ativos</small><strong>{formatarInteiro(detalhe.metricas.ativos)}</strong></div>
                <div><small>Aberturas 24m</small><strong>{formatarInteiro(detalhe.metricas.aberturas24m)}</strong></div>
                <div><small>Baixas 24m</small><strong>{formatarInteiro(detalhe.metricas.baixas24m)}</strong></div>
                <div><small>Taxa de fechamento</small><strong>{formatarPercentual(detalhe.metricas.taxaFechamento)}</strong></div>
                <div><small>Densidade do segmento</small><strong>{formatarDecimal(detalhe.metricas.densidadeSegmento)}</strong></div>
                <div><small>Complementares</small><strong>{formatarDecimal(detalhe.metricas.densidadeComplementares)}</strong></div>
              </div>
              <div className="mini-serie">
                <div>
                  <small>Aberturas recentes</small>
                  <div className="barras">
                    {detalheExpandido.serieAberturas.map((valor, indice) => (
                      <span key={`a-${indice}`} style={{ height: `${12 + valor * 10}px` }} />
                    ))}
                  </div>
                </div>
                <div>
                  <small>Baixas recentes</small>
                  <div className="barras barras--baixas">
                    {detalheExpandido.serieBaixas.map((valor, indice) => (
                      <span key={`b-${indice}`} style={{ height: `${12 + valor * 10}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="painel">
              <span className="etiqueta">Motivos de baixa</span>
              <h3>Distribuição do recorte selecionado</h3>
              <ul className="lista-motivos">
                {detalheExpandido.motivosBaixa.map((item) => (
                  <li key={item.motivo}>
                    <span>{item.motivo}</span>
                    <strong>{item.quantidade}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="painel">
              <span className="etiqueta">Comparação rápida</span>
              <h3>Áreas com maior base ativa</h3>
              <ul className="lista-comparacao">
                {comparacao.map((item) => (
                  <li key={item.hexId}>
                    <div>
                      <strong>{item.nomeArea}</strong>
                      <small>
                        Saturação {item.metricas.percentilSaturacao} • confiança {item.metricas.confiancaGeografica}
                      </small>
                    </div>
                    <div className="comparacao__numeros">
                      <span>{item.metricas.ativos} ativos</span>
                      <span>{formatarPercentual(item.metricas.taxaFechamento)} fechamento</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="painel painel--qualidade">
            <span className="etiqueta">Qualidade dos dados</span>
            <h3>Leitura operacional do snapshot</h3>
            <div className="qualidade-grid">
              <div><small>Cobertura geocodificada</small><strong>{formatarPercentual(qualidadeDados.coberturaGeocodificacao)}</strong></div>
              <div><small>Alta confiança</small><strong>{formatarPercentual(qualidadeDados.confiancaAlta)}</strong></div>
              <div><small>Média confiança</small><strong>{formatarPercentual(qualidadeDados.confiancaMedia)}</strong></div>
              <div><small>Baixa confiança</small><strong>{formatarPercentual(qualidadeDados.confiancaBaixa)}</strong></div>
            </div>
            <p className="texto-suporte">
              {formatarInteiro(qualidadeDados.enderecosParaRevisao)} endereços ainda precisam de revisão para análises
              espaciais mais finas. O app expõe esse contexto para evitar conclusões fortes em áreas pouco confiáveis.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
