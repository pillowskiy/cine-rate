import type { SeasonDetailsResponse } from '@app/types/tv-types';
import type { BaseParams } from '@app/types/index';
import { MediaType } from '@config/enums';
import { EpisodeArticle } from './episode-article';
import { $api } from '@/app/_shared/api/api-interceptor';
import { NotFound } from '@components/not-found';

async function getSeasonDetails(
  seriesId: number,
  seasonNumber: number,
  params?: BaseParams
) {
  return $api.get<SeasonDetailsResponse>(
    `/3/${MediaType.TV}/${seriesId}/season/${seasonNumber}`,
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
  const { data: season } = await getSeasonDetails(seriesId, seasonNumber);

  const sortBy = (a: number, b: number) => {
    return sort === 'asc' ? a - b : b - a;
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
