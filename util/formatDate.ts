export function formatDate(date: Date, locale: string = 'pt-BR'): string {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
  };

  return date.toLocaleString(locale, options);
}