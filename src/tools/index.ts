export const convertTimestamp = (timestamp: number): string => {
  const options = {
    day: '2-digit',
    month: 'long',
    timeZone: 'Europe/Sofia',
    year: 'numeric',
  };

  const formatted = new Intl.DateTimeFormat('en-GB', options as Intl.DateTimeFormatOptions).format(
    new Date(timestamp * 1000)
  );

  return formatted;
};

export const formatCurrency = (amount: string): string => {
  const currency = new Intl.NumberFormat('es-ES', { currency: 'BGN', style: 'currency' }).format(Number(amount) / 100);

  return currency;
};
