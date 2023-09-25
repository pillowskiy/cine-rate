'use client';

import type { ToggleResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { Heart } from 'lucide-react';
import axios from 'axios';

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

  async function toggleFavorite() {
    return (
      axios
        .post<ToggleResponse>('/api/states/favorites', {
          mediaType,
          creationId,
          favorite: !isFavorite,
        })
        .then(() => setIsFavorite(!isFavorite))
        // TEMP
        .catch(() => {})
    );
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
        <span className='ml-1.5'>{isFavorite ? 'Remove' : 'Add'}</span>
      )}
    </Button>
  );
}
