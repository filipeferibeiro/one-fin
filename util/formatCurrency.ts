export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency,
  });
}