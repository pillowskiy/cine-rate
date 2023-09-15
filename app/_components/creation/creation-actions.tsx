import type { MediaType } from '@app/types/index';
import { Star, TrendingUp } from 'lucide-react';
import { Button } from '@ui/button';
import type { CreationDetailsProps } from './common/types';
import { CreationReviewsDialog } from './creation-reviews-dialog';

interface CreationActionsProps extends CreationDetailsProps {
  mediaType: MediaType;
}

export function CreationActions({ details, mediaType }: CreationActionsProps) {
  return (
    <div className='flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start'>
      <div className='flex flex-col items-center justify-center space-y-1 text-center'>
        <span className='text-xs font-semibold uppercase'>TMDB Rating</span>
        <CreationReviewsDialog creationId={details.id} mediaType={mediaType}>
          <Button className='text-lg' variant='ghost' size='sm'>
            <Star className='mr-1.5 h-7 w-7 fill-yellow-400 text-yellow-400' />
            <span>{details.vote_average.toFixed(1)}</span>
          </Button>
        </CreationReviewsDialog>
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
