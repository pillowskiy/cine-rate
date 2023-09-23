import type { AccountStatesResponse } from '@app/types/creation-types';
import { useContext } from 'react';
import { StatesContext } from '.';

import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Star } from 'lucide-react';

import { CreationRatingDialog } from '@components/dialog/creation-rating-dialog';

interface RatingButtonProps {
  initialRated: AccountStatesResponse['rated'];
}

export function RatingButton({ initialRated }: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);

  return (
    <CreationRatingDialog
      initialRated={initialRated}
      mediaType={mediaType}
      creationId={creationId}
    >
      <Button
        className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
        size='icon'
        variant='outline'
      >
        <Star
          className={cn(
            'h-5 w-5',
            initialRated && 'fill-yellow-500 text-yellow-500'
          )}
        />
      </Button>
    </CreationRatingDialog>
  );
}
