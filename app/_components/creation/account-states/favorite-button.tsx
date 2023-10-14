'use client';

import type { BaseButtonProps } from './types';
import { useContext } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Heart } from 'lucide-react';
import { useToast } from '@ui/use-toast';
import ky from 'ky';
import { rejectKy } from '@libs/ky';
import { useOptimistic } from '@hooks/useOptimistic';

interface ToggleFavoriteProps extends BaseButtonProps {
  initialFavorite: boolean;
}

export function FavoriteButton({
  initialFavorite,
  withText,
  size,
  ...props
}: ToggleFavoriteProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const { toast } = useToast();
  const {
    action,
    state: favorite,
    isLoading,
  } = useOptimistic(initialFavorite, (state) => !state);

  async function toggleFavorite() {
    action(async () => {
      return ky.post('/api/states/favorites', {
        body: JSON.stringify({
          mediaType,
          creationId,
          favorite: !favorite,
        }),
        method: 'POST',
      }).then(res => res.json())
    }, {
      onReject: async (error) => {
        const { message } = await rejectKy(error);
        return toast({
          title: 'Uh Oh! Something went wrong!',
          description: message,
          variant: 'destructive',
        });
      }
    });
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
          size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
          favorite && 'fill-red-500 text-red-500'
        )}
      />
      {withText && (
        <span className='ml-1.5'>
          {favorite && 'fill-red-500 text-red-500' ? 'Unlist' : 'Add'}
        </span>
      )}
    </Button>
  );
}
