export function toISO(stringDate: string) {
  if (!stringDate) return undefined;
  return new Date(stringDate).toISOString().split('T')[0];
}
