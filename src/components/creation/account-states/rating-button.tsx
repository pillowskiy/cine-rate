import { useContext } from 'react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#ui/button';
import CreationRatingDialog from '#components/creation/creation-rating-dialog';
import { cn } from '#libs/index';
import { StatesAction, StatesContext } from './common/hooks';
import type { BaseButtonProps } from './common/types';

interface RatingButtonProps extends BaseButtonProps {}

export function RatingButton({ size, ...props }: RatingButtonProps) {
  const t = useTranslations('Creations.AccountStates.RatingButton');
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
            size === 'sm' ? 'size-5' : 'size-7',
            states.rated && 'fill-yellow-500 text-yellow-500'
          )}
        />
        <span className='ml-1.5'>{t('rate')}</span>
      </Button>
    </CreationRatingDialog>
  );
}
