import type { ICreation } from '#types/creation-types';

interface IRibbon {
  value: string;
  color: string;
}

export const ribbons = {
  popular: {
    value: 'popular',
    color: '#562275 ',
  },
  top_rated: {
    value: 'topRated',
    color: '#3d2e9e ',
  },
  novelty: {
    value: 'novelty',
    color: '#FF4500 ',
  },
  old_classic: {
    value: 'oldClassic',
    color: '#757575 ',
  },
  legendary: {
    value: 'legendary',
    color: '#F5C518',
  },
} as const satisfies Record<string, IRibbon>;

/*
 * TEMP: I don't quite like it, but as tempopary feature it's ok ¯\_(ツ)_/¯
 */
export function getCreationRibbon(
  creation: ICreation
): (typeof ribbons)[keyof typeof ribbons] | null {
  const releaseDate = new Date(
    creation.release_date || creation.first_air_date || Date.now()
  ).getTime();
  if (
    releaseDate < new Date('01.01.1990').getTime() &&
    creation.vote_average >= 7
  ) {
    return ribbons.old_classic;
  }

  const NOVELTY_EXPIRATION = 1000 * 60 * 60 * 24 * 14;
  if (releaseDate > new Date().getTime() - NOVELTY_EXPIRATION) {
    return ribbons.novelty;
  }

  if (creation.vote_count >= 10000) return ribbons.legendary;
  if (creation.popularity >= 800) return ribbons.popular;
  if (creation.vote_average >= 8 && creation.vote_count >= 100)
    return ribbons.top_rated;

  return null;
}
