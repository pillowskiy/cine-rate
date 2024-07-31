import type { CreationExternalIds } from '#types/creation-types';

export type CreationExternalUrls = Record<keyof CreationExternalIds, string>;
/**
 * Each source has suffix '_id' cuz tmdb api provided them in that way
 * I wouldn't infer source name from the key because it's not reliable
 * Of course, we can create mapping or smth, but I don't think it's worth it
 */
export const externalUrls = {
  imdb_id: 'https://www.imdb.com/title/',
  facebook_id: 'https://www.facebook.com/',
  instagram_id: 'https://www.instagram.com/',
  twitter_id: 'https://twitter.com/',
} as const satisfies CreationExternalUrls;
// as const satisfies Record<keyof CreationExternalIds extends `${infer U}_id` ? U : never, string>;

export function buildExternalUrls(ids: CreationExternalIds) {
  const urls: Partial<CreationExternalUrls> = {};
  if (typeof ids !== 'object' || !ids) return urls;
  for (const [key, value] of Object.entries(ids)) {
    const objKey = key as keyof typeof externalUrls;
    if (!value || !externalUrls[objKey]) continue;
    urls[objKey] = externalUrls[objKey] + value;
  }
  return urls;
}
