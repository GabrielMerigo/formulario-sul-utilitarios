export const formatValue = (value: string) => {
  const transactionValue = value;
  const prefixOff = transactionValue.replace('R$', '');
  const dotOff = prefixOff.replaceAll('.', '');
  console.log(value, dotOff);
  return Number(dotOff.replace(',', '.'));
};
