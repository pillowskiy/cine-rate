'use client';

import { useContext } from 'react';
import ky from 'ky';
import { Heart } from 'lucide-react';
import { useOptimistic } from '@hooks/useOptimistic';
import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';
import { cn } from '@libs/index';
import { rejectKy } from '@libs/ky';
import type { BaseButtonProps } from './common/types';
import { StatesAction, StatesContext } from './common/utils';

interface ToggleFavoriteProps extends BaseButtonProps {}

export function FavoriteButton({ size, ...props }: ToggleFavoriteProps) {
  const [states, dispatch] = useContext(StatesContext);
  const { toast } = useToast();
  const {
    action,
    state: favorite,
    isLoading,
  } = useOptimistic(states?.favorite, (state) => !state);

  if (!states) return null;

  async function toggleFavorite() {
    action(
      async () => {
        return ky
          .post('/api/states/favorites', {
            body: JSON.stringify({
              mediaType: states?.mediaType,
              creationId: states?.id,
              favorite: !favorite,
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
          return dispatch({ type: StatesAction.FAVORITE });
        },
      }
    );
  }

  return (
    <Button
      className={cn(isLoading && 'opacity-50')}
      onClick={toggleFavorite}
      size={size}
      disabled={isLoading}
      {...props}
    >
      <Heart
        className={cn(
          size === 'sm' ? 'size-5' : 'size-7',
          favorite && 'fill-red-500 text-red-500'
        )}
      />
      <span className='ml-1.5'>
        {favorite && 'fill-red-500 text-red-500' ? 'Unlist' : 'Add'}
      </span>
    </Button>
  );
}
