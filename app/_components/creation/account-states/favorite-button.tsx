'use client';

import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Heart } from 'lucide-react';
import { useToast } from '@ui/use-toast';
import ky from 'ky';
import { rejectKy } from '@libs/ky';

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
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { toast } = useToast();

  async function toggleFavorite() {
    ky.post('/api/states/favorites', {
      body: JSON.stringify({
        mediaType,
        creationId,
        favorite: !isFavorite,
      }),
      method: 'POST',
    }).then(async (res) => {
      if (!res.ok) {
        const { message } = await rejectKy(res);
        return toast({
          title: 'Uh Oh! Something went wrong!',
          description: message,
          variant: 'destructive',
        });
      }
      setIsFavorite(!isFavorite);
    });
  }

  return (
    <Button onClick={toggleFavorite} size={size} {...props}>
      <Heart
        className={cn(
          size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
          isFavorite && 'fill-red-500 text-red-500'
        )}
      />
      {withText && (
        <span className='ml-1.5'>{isFavorite ? 'Unlist' : 'Add'}</span>
      )}
    </Button>
  );
}
