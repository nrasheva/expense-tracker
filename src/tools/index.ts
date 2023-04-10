export const formatCurrency = (amount: number, currency: string): string => {
  const formatted = new Intl.NumberFormat('es-ES', {
    currency: currency,
    currencyDisplay: 'code',
    style: 'currency',
  }).format(amount / 100);

  return formatted;
};

export const formatTimestamp = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    timeZone: 'Europe/Sofia',
    year: 'numeric',
  };

  const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(timestamp * 1000));

  return formatted;
};
