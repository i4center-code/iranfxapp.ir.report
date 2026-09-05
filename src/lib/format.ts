const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert any string/number to Persian digits + Persian separators. */
export function toFa(value: string | number): string {
  return String(value)
    .replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
    .replace(/,/g, "٬")
    .replace(/\./g, "٫");
}

/** Grouped Persian number, e.g. 28500 -> ۲۸٬۵۰۰ */
export function faNum(n: number): string {
  return toFa(Math.round(n).toLocaleString("en-US"));
}

/** Persian price with fixed decimals, e.g. 2384.5/2 -> ۲٬۳۸۴٫۵۰ */
export function faPrice(n: number, decimals = 2): string {
  return toFa(
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

/** Persian percent with sign, e.g. +0.42 -> ‎+۰٫۴۲٪ */
export function faPct(n: number, decimals = 2): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return `${sign}${toFa(Math.abs(n).toFixed(decimals))}٪`;
}

/** Current clock time in Persian digits, e.g. ۱۴:۰۳ */
export function faTime(d = new Date()): string {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return toFa(`${h}:${m}`);
}
