export const formatMAD = (value: number | string | null | undefined) => {
  const num = typeof value === 'string' ? Number(value) : (value ?? 0);
  try {
    return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(Number(num));
  } catch {
    return `${num} MAD`;
  }
};
