import type { AccountStatesResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext } from 'react';
import { StatesAction, StatesContext } from './utils';

import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Star } from 'lucide-react';

import { CreationRatingDialog } from '@components/dialog/creation-rating-dialog';

interface RatingButtonProps extends BaseButtonProps {}

export function RatingButton({ withText, size, ...props }: RatingButtonProps) {
  const [states, dispatch] = useContext(StatesContext);
  if (!states) return null;

  return (
    <CreationRatingDialog
      initialRated={states.rated}
      mediaType={states.mediaType}
      creationId={states.id}
      onUpdate={({ rating }) =>
        dispatch({
          type: StatesAction.RATED,
          payload: rating ? { value: rating } : false,
        })
      }
    >
      <Button size={size} {...props}>
        <Star
          className={cn(
            size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
            states.rated && 'fill-yellow-500 text-yellow-500'
          )}
        />
        {withText && <span className='ml-1.5'>Rate</span>}
      </Button>
    </CreationRatingDialog>
  );
}
