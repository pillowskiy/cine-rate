import type { BaseParams } from '@app/types/index';
import type { SeasonDetailsResponse } from '@app/types/tv-types';

import { MediaType } from '@config/enums';

import { NotFound } from '@components/not-found';

import { $api } from '@api/api-interceptor';

import { EpisodeArticle } from './episode-article';

async function getSeasonDetails(
  seriesId: number,
  seasonNumber: number,
  params?: BaseParams
) {
  return $api.safeFetch<SeasonDetailsResponse>(
    `/${MediaType.TV}/${seriesId}/season/${seasonNumber}`,
    { params }
  );
}

interface EpisodeListProps {
  seriesId: number;
  seasonNumber: number;
  sort?: string;
}

export default async function EpisodeList({
  seriesId,
  seasonNumber,
  sort,
}: EpisodeListProps) {
  const [season] = await getSeasonDetails(seriesId, seasonNumber);

  const sortBy = (a: number, b: number) => {
    return sort === 'desc' ? b - a : a - b;
  };

  return (
    <section className='space-y-4'>
      {season?.episodes.length ? (
        season.episodes
          .sort((a, b) => sortBy(a.episode_number, b.episode_number))
          .map((episode, i) => (
            <EpisodeArticle
              custom={i}
              seriesId={seriesId}
              key={episode.id}
              episode={episode}
            />
          ))
      ) : (
        <NotFound />
      )}
    </section>
  );
}
