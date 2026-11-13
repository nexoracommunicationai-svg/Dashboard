export function formatCurrency(
  value: number,
  currency = 'EUR',
  rate: number = 1,
  symbol: string = '€'
): string {
  void currency;
  const converted = value * rate;
  if (Math.abs(converted) >= 1_000_000_000) {
    return `${(converted / 1_000_000_000).toFixed(1)} Mrd ${symbol}`;
  }
  if (Math.abs(converted) >= 1_000_000) {
    return `${(converted / 1_000_000).toFixed(1)} M ${symbol}`;
  }
  return `${converted.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
}

export function formatCompactNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} Mrd`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)} k`;
  }
  return value.toLocaleString('fr-FR');
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
