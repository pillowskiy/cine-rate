import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { BookmarkPlus } from 'lucide-react';
import { cn } from '@libs/index';
import { useToast } from '@ui/use-toast';
import ky from 'ky';
import { rejectKy } from '@libs/ky';
import { useOptimistic } from '@/app/_hooks/useOptimistic';

interface RatingButtonProps extends BaseButtonProps {
  alreadyInList: boolean;
}

export function WatchlistButton({
  alreadyInList,
  withText,
  size,
  ...props
}: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const { toast } = useToast();

  const {
    action,
    state: inWatchlist,
    isLoading,
  } = useOptimistic(alreadyInList, (state) => !state);

  async function toggleWatchlist() {
    action(
      async () => {
        return ky
          .post('/api/states/watchlist', {
            body: JSON.stringify({
              mediaType,
              creationId,
              watchlist: !inWatchlist,
            }),
            method: 'POST',
          })
          .then((res) => res.json());
      },
      {
        onReject: async (error) => {
          const { message } = await rejectKy(error);
          return toast({
            title: 'Uh Oh! Something went wrong!',
            description: message,
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <Button
      className={cn(isLoading && 'opacity-50')}
      size={size}
      onClick={toggleWatchlist}
      disabled={isLoading}
      {...props}
    >
      <BookmarkPlus
        className={cn(
          size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
          inWatchlist && 'fill-foreground'
        )}
      />
      {withText && (
        <span className='ml-1.5'>{inWatchlist ? 'Unlist' : 'Add'}</span>
      )}
    </Button>
  );
}
