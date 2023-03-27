export const formatValue = (value: string) => {
  const transactionValue = value;
  const prefixOff = transactionValue.replace('R$', '');
  const dotOff = prefixOff.replaceAll('.', '');
  return Number(dotOff.replace(',', '.'));
};
