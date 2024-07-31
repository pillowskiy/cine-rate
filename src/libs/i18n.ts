type LocaleDateFormatter = (
  locale: string,
  dateLike: Date | string | number
) => string;

export const formatToLocaleLongDate: LocaleDateFormatter = (
  locale,
  dateLike
) => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parseDate(dateLike));
};

export const formatToLocaleShortDate: LocaleDateFormatter = (
  locale,
  dateLike
) => {
  return new Intl.DateTimeFormat(locale).format(parseDate(dateLike));
};

function parseDate(date: string | number | Date) {
  if (date instanceof Date) return date;
  return new Date(date);
}
