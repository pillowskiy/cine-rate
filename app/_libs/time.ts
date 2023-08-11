const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export function getRelativeTime(timestamp: number) {
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / DAY_MILLISECONDS
  );

  return isNaN(daysDifference)
    ? 'Release date not found'
    : rtf.format(daysDifference, 'days');
}
