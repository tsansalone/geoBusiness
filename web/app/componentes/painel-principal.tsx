"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { carregarDetalheArea, carregarMapa, carregarQualidade, carregarSegmentos } from "../lib/api";
import {
  cidadePadrao,
  detalhesArea,
  obterHexagonosPainelExemplo,
  qualidadeDados,
  segmentos
} from "../lib/dados-exemplo";
import { formatarDecimal, formatarInteiro, formatarPercentual } from "../lib/formatadores";
import type { DetalheArea, FonteDados, HexagonoPainel, QualidadeDados, Segmento } from "../tipos/geobusiness";

type MetricaSelecionada = "ativos" | "aberturas24m" | "baixas24m" | "taxaFechamento" | "densidadeSegmento";

const mapaMetricasApi: Record<MetricaSelecionada, string> = {
  ativos: "ativos",
  aberturas24m: "aberturas_24m",
  baixas24m: "baixas_24m",
  taxaFechamento: "taxa_fechamento",
  densidadeSegmento: "densidade_segmento"
};

function criarPontosHexagono(centroX: number, centroY: number, raio = 42): string {
  const pontos = Array.from({ length: 6 }, (_, indice) => {
    const angulo = (Math.PI / 3) * indice - Math.PI / 6;
    const x = centroX + raio * Math.cos(angulo);
    const y = centroY + raio * Math.sin(angulo);
    return `${x},${y}`;
  });
  return pontos.join(" ");
}

function obterValorMetrica(hexagono: HexagonoPainel, metrica: MetricaSelecionada): number {
  if (metrica === "ativos") return hexagono.metricas.ativos;
  if (metrica === "aberturas24m") return hexagono.metricas.aberturas24m;
  if (metrica === "baixas24m") return hexagono.metricas.baixas24m;
  if (metrica === "taxaFechamento") return hexagono.metricas.taxaFechamento;
  return hexagono.metricas.densidadeSegmento;
}

export function PainelPrincipal() {
  const [segmentosDisponiveis, setSegmentosDisponiveis] = useState<Segmento[]>(segmentos);
  const [segmentoSelecionado, setSegmentoSelecionado] = useState(segmentos[0].id);
  const [metricaSelecionada, setMetricaSelecionada] = useState<MetricaSelecionada>("ativos");
  const [hexagonosPainel, setHexagonosPainel] = useState<HexagonoPainel[]>(obterHexagonosPainelExemplo(segmentos[0].id));
  const [hexSelecionado, setHexSelecionado] = useState(hexagonosPainel[2]?.hexId ?? hexagonosPainel[0].hexId);
  const [detalheExpandido, setDetalheExpandido] = useState<DetalheArea>(detalhesArea[hexSelecionado]);
  const [cidadeAtual, setCidadeAtual] = useState(cidadePadrao);
  const [qualidadeAtual, setQualidadeAtual] = useState<QualidadeDados>(qualidadeDados);
  const [fonteDadosAtual, setFonteDadosAtual] = useState<FonteDados>("sintetica");

  const segmentoDefasado = useDeferredValue(segmentoSelecionado);

  useEffect(() => {
    let cancelado = false;

    async function carregarCabecalho() {
      try {
        const [segmentosApi, qualidadeApi] = await Promise.all([carregarSegmentos(), carregarQualidade()]);
        if (cancelado) return;

        startTransition(() => {
          if (segmentosApi.length > 0) {
            setSegmentosDisponiveis(segmentosApi);
            if (!segmentosApi.some((segmento) => segmento.id === segmentoSelecionado)) {
              setSegmentoSelecionado(segmentosApi[0].id);
            }
          }
          setQualidadeAtual(qualidadeApi);
          setFonteDadosAtual(qualidadeApi.fonteDados);
        });
      } catch {
        if (cancelado) return;
        startTransition(() => {
          setSegmentosDisponiveis(segmentos);
          setQualidadeAtual(qualidadeDados);
          setFonteDadosAtual("sintetica");
        });
      }
    }

    carregarCabecalho();
    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    let cancelado = false;

    async function carregarMapaAtual() {
      try {
        const respostaMapa = await carregarMapa(segmentoDefasado, mapaMetricasApi[metricaSelecionada]);
        if (cancelado) return;

        startTransition(() => {
          setCidadeAtual(respostaMapa.cidade);
          setFonteDadosAtual(respostaMapa.fonteDados);
          setHexagonosPainel(respostaMapa.hexagonos);
          if (!respostaMapa.hexagonos.some((hexagono) => hexagono.hexId === hexSelecionado)) {
            setHexSelecionado(respostaMapa.hexagonos[0]?.hexId ?? "");
          }
        });
      } catch {
        if (cancelado) return;
        startTransition(() => {
          const fallback = obterHexagonosPainelExemplo(segmentoDefasado);
          setCidadeAtual(cidadePadrao);
          setFonteDadosAtual("sintetica");
          setHexagonosPainel(fallback);
          if (!fallback.some((hexagono) => hexagono.hexId === hexSelecionado)) {
            setHexSelecionado(fallback[0]?.hexId ?? "");
          }
        });
      }
    }

    carregarMapaAtual();
    return () => {
      cancelado = true;
    };
  }, [metricaSelecionada, segmentoDefasado]);

  useEffect(() => {
    if (!hexSelecionado) return;
    let cancelado = false;

    async function carregarDetalheAtual() {
      try {
        const detalheApi = await carregarDetalheArea(hexSelecionado, segmentoDefasado);
        if (cancelado) return;
        startTransition(() => {
          setDetalheExpandido(detalheApi);
        });
      } catch {
        if (cancelado) return;
        startTransition(() => {
          setDetalheExpandido(detalhesArea[hexSelecionado] ?? detalhesArea["89a81000003ffff"]);
        });
      }
    }

    carregarDetalheAtual();
    return () => {
      cancelado = true;
    };
  }, [hexSelecionado, segmentoDefasado]);

  const detalhe = hexagonosPainel.find((hexagono) => hexagono.hexId === hexSelecionado) ?? hexagonosPainel[0];
  const mediaAtivos =
    hexagonosPainel.reduce((acumulado, item) => acumulado + item.metricas.ativos, 0) / Math.max(hexagonosPainel.length, 1);
  const mediaFechamento =
    hexagonosPainel.reduce((acumulado, item) => acumulado + item.metricas.taxaFechamento, 0) /
    Math.max(hexagonosPainel.length, 1);
  const comparacao = [...hexagonosPainel].sort((a, b) => b.metricas.ativos - a.metricas.ativos).slice(0, 3);

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
              <strong>{cidadeAtual}</strong>
            </div>
            <div>
              <span className="etiqueta">Snapshot</span>
              <strong>{qualidadeAtual.snapshotReferencia}</strong>
            </div>
            <div>
              <span className="etiqueta">Fonte</span>
              <strong>{fonteDadosAtual === "real" ? "Dados reais" : "Fallback sintético"}</strong>
            </div>
            <div>
              <span className="etiqueta">Cobertura geocodificada</span>
              <strong>{formatarPercentual(qualidadeAtual.coberturaGeocodificacao)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="filtros">
          <div className="bloco">
            <span className="etiqueta">Segmento</span>
            <div className="lista-segmentos">
              {segmentosDisponiveis.map((segmento) => (
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
                  onClick={() => setMetricaSelecionada(valor as MetricaSelecionada)}
                >
                  {rotulo}
                </button>
              ))}
            </div>
          </div>

          <div className="bloco bloco--resumo">
            <span className="etiqueta">Leitura rápida</span>
            <p>
              <strong>{segmentosDisponiveis.find((item) => item.id === segmentoDefasado)?.nome}</strong> apresenta média
              de <strong>{formatarDecimal(mediaAtivos)}</strong> ativos por célula e taxa média de fechamento de{" "}
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
              <strong>{detalhe?.nomeArea}</strong>
            </article>
            <article>
              <span className="etiqueta">Percentil de saturação</span>
              <strong>{detalhe?.metricas.percentilSaturacao ?? 0}</strong>
            </article>
            <article>
              <span className="etiqueta">Confiabilidade</span>
              <strong>{detalhe?.metricas.confiancaGeografica ?? "baixa"}</strong>
            </article>
          </section>

          <section className="painel-mapa">
            <div className="painel-mapa__cabecalho">
              <div>
                <span className="etiqueta">Explorador de segmentos</span>
                <h2>Distribuição espacial e histórico recente</h2>
              </div>
              <p>
                {fonteDadosAtual === "real"
                  ? "Painel usando dados reais do recorte espacial disponível."
                  : "Painel em fallback demonstrativo enquanto a camada espacial real não está disponível ou a API não está acessível."}
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
                {hexagonosPainel.map((hexagono) => {
                  const valor = obterValorMetrica(hexagono, metricaSelecionada);
                  const intensidade = valor <= 1 ? Math.max(0.18, valor) : Math.min(Number(valor) / 30, 1);
                  const selecionado = detalhe?.hexId === hexagono.hexId;
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
                        {valor < 1 ? formatarPercentual(valor) : formatarInteiro(Number(valor))}
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
              <h3>{detalhe?.nomeArea}</h3>
              <p className="texto-suporte">{detalheExpandido?.observacao}</p>
              <div className="metricas-grid">
                <div><small>Ativos</small><strong>{formatarInteiro(detalhe?.metricas.ativos ?? 0)}</strong></div>
                <div><small>Aberturas 24m</small><strong>{formatarInteiro(detalhe?.metricas.aberturas24m ?? 0)}</strong></div>
                <div><small>Baixas 24m</small><strong>{formatarInteiro(detalhe?.metricas.baixas24m ?? 0)}</strong></div>
                <div><small>Taxa de fechamento</small><strong>{formatarPercentual(detalhe?.metricas.taxaFechamento ?? 0)}</strong></div>
                <div><small>Densidade do segmento</small><strong>{formatarDecimal(detalhe?.metricas.densidadeSegmento ?? 0)}</strong></div>
                <div><small>Complementares</small><strong>{formatarDecimal(detalhe?.metricas.densidadeComplementares ?? 0)}</strong></div>
              </div>
              <div className="mini-serie">
                <div>
                  <small>Aberturas recentes</small>
                  <div className="barras">
                    {detalheExpandido?.serieAberturas.map((valor, indice) => (
                      <span key={`a-${indice}`} style={{ height: `${12 + valor * 10}px` }} />
                    ))}
                  </div>
                </div>
                <div>
                  <small>Baixas recentes</small>
                  <div className="barras barras--baixas">
                    {detalheExpandido?.serieBaixas.map((valor, indice) => (
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
                {detalheExpandido?.motivosBaixa.map((item) => (
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
              <div><small>Cobertura geocodificada</small><strong>{formatarPercentual(qualidadeAtual.coberturaGeocodificacao)}</strong></div>
              <div><small>Alta confiança</small><strong>{formatarPercentual(qualidadeAtual.confiancaAlta)}</strong></div>
              <div><small>Média confiança</small><strong>{formatarPercentual(qualidadeAtual.confiancaMedia)}</strong></div>
              <div><small>Baixa confiança</small><strong>{formatarPercentual(qualidadeAtual.confiancaBaixa)}</strong></div>
            </div>
            <p className="texto-suporte">
              {formatarInteiro(qualidadeAtual.enderecosParaRevisao)} endereços ainda precisam de revisão para análises
              espaciais mais finas. Fonte atual do painel:{" "}
              <strong>{fonteDadosAtual === "real" ? "dados reais do recorte" : "fallback sintético demonstrativo"}</strong>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
