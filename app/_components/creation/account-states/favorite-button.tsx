'use client';

import type { ToggleResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Heart } from 'lucide-react';
import { useToast } from '@ui/use-toast';
import { fetch } from '@libs/common/fetch';

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
    fetch<ToggleResponse>('/api/states/favorites', {
      body: JSON.stringify({
        mediaType,
        creationId,
        favorite: !isFavorite,
      }),
      method: 'POST',
    })
      .then(() => {
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        toast({
          title: 'Uh Oh! Something went wrong!',
          description: error.statusText,
          variant: 'destructive',
        });
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
