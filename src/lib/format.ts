/**
 * Türkiye kullanımına uygun tarih, saat ve sayı biçimleme yardımcıları.
 */

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("tr-TR");

export function formatDate(input: string | Date): string {
  return dateFormatter.format(new Date(input));
}

export function formatDateTime(input: string | Date): string {
  return dateTimeFormatter.format(new Date(input));
}

export function formatTime(input: string | Date): string {
  return timeFormatter.format(new Date(input));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return currencyFormatter.format(amount);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * "3 dakika önce", "2 saat önce", "Dün", "5 gün önce" gibi göreli zaman gösterimi.
 */
export function formatRelativeTime(input: string | Date): string {
  const date = new Date(input);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "Az önce";
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHour < 24) return `${diffHour} saat önce`;
  if (diffDay === 1) return "Dün";
  if (diffDay < 7) return `${diffDay} gün önce`;
  return formatDate(date);
}
