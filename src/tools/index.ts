export const convertTimestamp = (timestamp: number): string => {
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

export const formatCurrency = (amount: string): string => {
  const currency = new Intl.NumberFormat('es-ES', { currency: 'BGN', style: 'currency' }).format(Number(amount) / 100);

  return currency;
};
