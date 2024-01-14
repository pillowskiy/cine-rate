import type {
  CreationExternalIds,
  CreationVideosResponse,
  ICreation,
} from '@app/types/creation-types';
import type { IRibbon } from '@app/types/index';

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface TMDBImagePathProps {
  path: string | null;
  scale?: keyof typeof scales;
}

const scales = {
  avatar: 'w45_and_h45_face',
  poster: `w500`,
  backdrop: `w500_and_h282_face`,
  large_backdrop: 'w1000_and_h450_face',
} as const;

// TEMP: to scales
export const images = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
} as const;

export function buildImagePath({ path, scale }: TMDBImagePathProps) {
  if (!path) return null;
  return TMDB_IMAGE_URL + (scale ? scales[scale] : 'original') + path;
}

export function buildGravatarPath(hash: string) {
  return `https://secure.gravatar.com/avatar/${hash}?s=90`;
}

export function inferOfficialTrailer({ results }: CreationVideosResponse) {
  const officialTrailer = results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  return results.length ? officialTrailer || results[0] : null;
}

export type CreationExternalUrls = Record<keyof CreationExternalIds, string>;
/**
 * Each source has suffix '_id' cuz tmdb api provided them in that way
 * I wouldn't infer source name from the key because it's not reliable
 * Of course, we can serialize the api response, but I don't think it's worth it
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

export const ribbons = {
  popular: {
    name: 'Popular',
    color: '#562275 ',
  },
  top_rated: {
    name: 'Top Rated',
    color: '#3d2e9e ',
  },
  novelty: {
    name: 'Novelty',
    color: '#FF4500 ',
  },
  old_classic: {
    name: 'Old Classic',
    color: '#757575 ',
  },
  legendary: {
    name: 'Legendary',
    color: '#F5C518',
  },
} as const satisfies Record<string, IRibbon>;

/*
  * TEMP: I don't quite like it, but as tempopary feature it's ok ¯\_(ツ)_/¯
 */
export function getCreationRibbon(creation: ICreation): IRibbon | null {
  const releaseDate = new Date(creation.release_date).getTime();
  if (releaseDate < new Date('01.01.1990').getTime() && creation.vote_average >= 7) {
    return ribbons.old_classic;
  }

  const NOVELTY_EXPIRATION = 1000 * 60 * 60 * 24 * 14;
  if (releaseDate > new Date().getTime() - NOVELTY_EXPIRATION) {
    return ribbons.novelty;
  }

  if (creation.vote_count >= 10000) return ribbons.legendary;
  if (creation.popularity >= 800) return ribbons.popular;
  if (creation.vote_average >= 8 && creation.vote_count >= 100) return ribbons.top_rated;

  return null;
}
