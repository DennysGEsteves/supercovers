export const capitalize = (str: string): string =>
  str.toLowerCase().replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
