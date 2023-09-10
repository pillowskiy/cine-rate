import { Star, TrendingUp } from 'lucide-react';
import { Button } from '@ui/button';
import type { CreationDetailsProps } from './common/types';

export function CreationActions({ details }: CreationDetailsProps) {
  return (
    <div className='w-full flex justify-between gap-4 sm:justify-start sm:w-fit overflow-x-auto'>
      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='text-xs font-semibold uppercase'>TMDB Rating</span>
        <Button className='text-lg' variant='ghost' size='sm'>
          <Star className='mr-1.5 h-7 w-7 fill-yellow-400 text-yellow-400' />
          <span>{details.vote_average.toFixed(1)}</span>
        </Button>
      </div>

      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='text-xs font-semibold uppercase'>Your Rating</span>
        <Button className='text-lg' variant='ghost' size='sm'>
          <Star className='mr-1.5 h-7 w-7' />
          <span>Rate</span>
        </Button>
      </div>

      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='text-xs font-semibold uppercase'>Popularity</span>
        <Button className='text-lg' variant='ghost' size='sm'>
          <TrendingUp className='mr-1.5 h-7 w-7' />
          <span>{details.popularity.toFixed(0)}</span>
        </Button>
      </div>
    </div>
  );
}
