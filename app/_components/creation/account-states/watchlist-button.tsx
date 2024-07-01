import { useContext } from 'react';

import { useOptimistic } from '@/app/_hooks/useOptimistic';
import ky from 'ky';
import { BookmarkPlus } from 'lucide-react';

import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';

import { cn } from '@libs/index';
import { rejectKy } from '@libs/ky';

import type { BaseButtonProps } from './common/types';
import { StatesAction, StatesContext } from './common/utils';

interface RatingButtonProps extends BaseButtonProps {}

export function WatchlistButton({ size, ...props }: RatingButtonProps) {
  const [states, dispatch] = useContext(StatesContext);
  const { toast } = useToast();

  const {
    action,
    state: inWatchlist,
    isLoading,
  } = useOptimistic(states?.watchlist, (state) => !state);

  if (!states) return null;

  async function toggleWatchlist() {
    action(
      async () => {
        return ky
          .post('/api/states/watchlist', {
            body: JSON.stringify({
              mediaType: states?.mediaType,
              creationId: states?.id,
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
        onResolve: () => {
          return dispatch({ type: StatesAction.WATCHLIST });
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
          size === 'sm' ? 'size-5' : 'size-7',
          inWatchlist && 'fill-foreground'
        )}
      />
      <span className='ml-1.5'>{inWatchlist ? 'Unlist' : 'Add'}</span>
    </Button>
  );
}
