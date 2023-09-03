import type { ISeason } from '@app/types/tv-types';
import type { ReactNode } from 'react';
import { buildImagePath } from '@/app/_libs/tmdb';
import { Star } from 'lucide-react';
import {
  BaseArticle,
  BaseArticleFigure,
  type BaseArticleProps,
} from './base-article';
import { cn } from '@/app/_libs';

interface SeasonCardProps extends BaseArticleProps {
  action?: ReactNode;
  season: ISeason;
}

export function SeasonCard({
  season,
  action,
  className,
  ...props
}: SeasonCardProps) {
  return (
    <BaseArticle
      className={cn(
        'flex w-full items-center sm:gap-4',
        className
      )}
      {...props}
    >
      <div>
        <BaseArticleFigure
          className='hidden w-[120px] min-w-[120px] sm:block'
          src={buildImagePath({
            path: season.poster_path,
            scale: 'poster',
          })}
          aspect='vertical'
          width={320}
          height={550}
          alt='Season Poster'
        />
      </div>
      <div className='w-full sm:w-max'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>
            {season.name}
          </h2>
          <div className='flex items-center justify-between gap-2 text-xs'>
            <div className='flex items-center space-x-1.5'>
              <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
              <span>{season.vote_average.toFixed(1)}</span>
            </div>
            <span>{season.episode_count} Episodes</span>
          </div>
        </div>

        <div className='my-4'>
          <p className='text-sm tracking-tight sm:text-base'>
            Season {season.season_number} premiered on{' '}
            {new Date(season.air_date).toDateString()}
          </p>
        </div>

        {!!action && action}
      </div>
    </BaseArticle>
  );
}
