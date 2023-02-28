export const formatValue = (value: string) => {
  const transactionValue = value;
  const prefixOff = transactionValue.replace('R$', '');
  const dotOff = prefixOff.replace('.', '');
  return Number(dotOff.replace(',', '.'));
};
