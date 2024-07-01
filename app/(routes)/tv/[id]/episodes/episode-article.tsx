import { memo } from 'react';

import { Star } from 'lucide-react';

import type { IEpisode } from '@app/types/tv-types';

import {
  BaseArticle,
  BaseArticleFigure,
  type BaseArticleProps,
} from '@components/article/base-article';

import { buildImagePath } from '@libs/tmdb';

import { EpisodeDetails } from './episode-details';

interface EpisodeArticleProps extends BaseArticleProps {
  seriesId: number;
  episode: IEpisode;
}

export const EpisodeArticle = memo(
  ({ seriesId, episode, ...props }: EpisodeArticleProps) => {
    return (
      <BaseArticle
        className='space-y-4 rounded-md border p-4'
        key={episode.id}
        {...props}
      >
        <section className='flex w-full flex-col items-start gap-4 sm:flex-row'>
          <div className='w-full sm:w-fit'>
            <BaseArticleFigure
              className='w-full sm:w-[160px] sm:min-w-[160px]'
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
        <EpisodeDetails seriesId={seriesId} episode={episode} />
      </BaseArticle>
    );
  }
);

EpisodeArticle.displayName = 'EpisodeArticle';
