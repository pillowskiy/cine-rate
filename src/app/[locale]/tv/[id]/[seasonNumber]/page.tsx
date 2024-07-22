import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import type { BaseParams, INextPageParams } from '#types/index';
import type { SeasonDetailsResponse } from '#types/tv-types';
import { MediaType } from '#config/enums';
import {
  BaseArticle,
  BaseArticleFigure,
} from '#components/article/base-article';
import { $api } from '#api/api-interceptor';
import { pipe } from '#libs/common/next';
import { buildImagePath } from '#libs/tmdb';

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

export default async function SeasonPage({ params }: INextPageParams) {
  const seriesId = pipe.strToInt(params?.id);
  const seasonNumber = pipe.strToInt(params?.seasonNumber);
  const [season] = await getSeasonDetails(seriesId, seasonNumber);

  if (!season) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      {season.episodes.map((episode) => (
        <BaseArticle
          className='space-y-4 rounded-md border p-4'
          key={episode.id}
        >
          <section className='flex w-full flex-col items-center gap-4 sm:flex-row'>
            <div className='w-full sm:w-fit'>
              <BaseArticleFigure
                className='w-full sm:w-[260px] sm:min-w-[260px]'
                src={buildImagePath({
                  path: episode.still_path,
                  scale: 'backdrop',
                })}
                aspect='horizontal'
                width={500}
                height={282}
                alt='Episode Poster'
              />
            </div>
            <div className='space-y-1.5'>
              <div>
                <span className='font-semibold'>
                  {episode.episode_number}. {episode.name}
                </span>
                <div className='flex gap-1.5 text-sm'>
                  <div className='flex items-center space-x-1.5'>
                    <Star className='size-4 fill-yellow-300 text-yellow-400' />
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </div>
                  <span>{new Date(episode.air_date).toDateString()}</span>
                </div>
              </div>
              {!!episode.overview && <p>{episode.overview}</p>}
            </div>
          </section>
        </BaseArticle>
      ))}
    </main>
  );
}
