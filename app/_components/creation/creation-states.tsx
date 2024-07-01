import { Star, TrendingUp } from 'lucide-react';
import { cn } from '@libs/index';
import type { CreationDetailsProps } from './common/types';

interface CreationStatesProps extends CreationDetailsProps {}

export function CreationStates({ details }: CreationStatesProps) {
  return (
    <div className='flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start'>
      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='truncate text-xs font-semibold uppercase'>
          TMDB Rating
        </span>
        <div
          className={cn(
            'inline-flex select-none items-center justify-center rounded-md px-2 py-1',
            'text-lg font-medium disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Star className='mr-1.5 size-7 fill-yellow-400 text-yellow-400' />
          <span>{details.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='truncate text-xs font-semibold uppercase'>
          Popularity
        </span>
        <div
          className={cn(
            'inline-flex select-none items-center justify-center rounded-md px-2 py-1',
            'text-lg font-medium disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <TrendingUp className='mr-1.5 size-7' />
          <span>{details.popularity.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
