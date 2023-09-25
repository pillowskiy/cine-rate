import type { AccountStatesResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext } from 'react';
import { StatesContext } from '.';

import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Star } from 'lucide-react';

import { CreationRatingDialog } from '@components/dialog/creation-rating-dialog';

interface RatingButtonProps extends BaseButtonProps {
  initialRated: AccountStatesResponse['rated'];
}

export function RatingButton({
  initialRated,
  withText,
  size,
  ...props
}: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);

  return (
    <CreationRatingDialog
      initialRated={initialRated}
      mediaType={mediaType}
      creationId={creationId}
    >
      <Button size={size} {...props}>
        <Star
          className={cn(
            size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
            initialRated && 'fill-yellow-500 text-yellow-500'
          )}
        />
        {withText && (
          <span className='ml-1.5'>
            Rate
          </span>
        )}
      </Button>
    </CreationRatingDialog>
  );
}
