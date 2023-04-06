export const formatCurrency = (amount: number): string => {
  const currency = new Intl.NumberFormat('es-ES', {
    currency: 'EUR',
    currencyDisplay: 'code',
    style: 'currency',
  }).format(amount / 100);

  return currency;
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
