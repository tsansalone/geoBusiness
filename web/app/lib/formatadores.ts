export function formatarPercentual(valor: number): string {
  return `${(valor * 100).toFixed(0)}%`;
}

export function formatarDecimal(valor: number): string {
  return valor.toFixed(2).replace(".", ",");
}

export function formatarInteiro(valor: number): string {
  return new Intl.NumberFormat("pt-BR").format(valor);
}
