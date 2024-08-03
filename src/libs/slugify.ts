const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_REGEXP = /[^\w\s-]/g;
const WHITESPACE_AND_HYPHENS_REGEXP = /[\s_-]+/g;
const TRAILING_DASH_REGEXP = /^-+|-+$/g;

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(DIACRITICS_REGEXP, '')
    .replace(NON_ALPHANUMERIC_REGEXP, '')
    .replace(WHITESPACE_AND_HYPHENS_REGEXP, '-')
    .replace(TRAILING_DASH_REGEXP, '');
}
