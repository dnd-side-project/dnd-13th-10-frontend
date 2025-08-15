export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const range = (a: number, b: number) =>
  Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const daysInMonth = (y: number, m1: number) =>
  new Date(y, m1, 0).getDate();
