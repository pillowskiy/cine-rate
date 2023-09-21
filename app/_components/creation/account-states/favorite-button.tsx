'use client';

import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '../../ui/button';
import { cn } from '@/app/_libs';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { ToggleFavoriteResponse } from '@/app/_types/creation-types';

interface ToggleFavoriteProps {
  initialFavorite: boolean;
}

export function FavoriteButton({ initialFavorite }: ToggleFavoriteProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  async function toggleFavorite() {
    return axios
      .post<ToggleFavoriteResponse>('/api/favorites/', {
        mediaType,
        creationId,
        favorite: !isFavorite,
      })
      .then(({ data }) => setIsFavorite(!isFavorite))
      .catch(console.log);
  }

  return (
    <Button
      className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
      onClick={toggleFavorite}
      size='icon'
      variant='outline'
    >
      <Heart
        className={cn('h-5 w-5', isFavorite && 'fill-red-500 text-red-500')}
      />
    </Button>
  );
}
