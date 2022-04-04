export const formatterBRL = (value) => {
  value = parseFloat(value);
  value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  return value;
};

export const parserBRL = (value) => {
  value = value.replace(/\D/g, "");
  value = parseFloat(value || 0);
  value /= 100;
  return value;
};

export const formatterPercent = (value) => {
  value = Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((value || 0) / 100);
  return value;
};

export const parserPercent = (value) => {
  value = value.replace(/\D/g, "");

  value = parseFloat(value || 0);
  value /= 100;

  if (value < 0) return 0;
  if (value > 100) return 100;

  return value;
};

export const delPercent = (e, value) => {
  value = parseFloat(value || 0);
  if (e.key === "Backspace") {
    value /= 10;
    return value;
  } else {
    return value;
  }
};

export const parserPeriod = (value) => {
  value = value.toString();
  value = value.replace(/\D/g, "");

  value = parseInt(value || 0);

  if (value < 0) return 0;
  if (value > 1440) return 1440;

  return value;
};
