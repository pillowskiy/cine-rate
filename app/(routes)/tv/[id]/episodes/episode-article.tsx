import type { IEpisode } from '@app/types/tv-types';
import {
  BaseArticle,
  BaseArticleFigure,
} from '@components/article/base-article';
import { buildImagePath } from '@libs/tmdb';
import { Star } from 'lucide-react';

interface EpisodeArticleProps {
  episode: IEpisode;
}

export function EpisodeArticle({ episode }: EpisodeArticleProps) {
  return (
    <BaseArticle className='space-y-4 rounded-md border p-4' key={episode.id}>
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
                <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
                <span>{episode.vote_average.toFixed(1)}</span>
              </div>
              <span>{new Date(episode.air_date).toDateString()}</span>
            </div>
          </div>
          {!!episode.overview && <p>{episode.overview}</p>}
        </div>
      </section>
    </BaseArticle>
  );
}
