'use client';

import { cn } from '@libs/index';
import { MediaType } from '@app/types/index';
import { Button } from '@ui/button';
import { Heart } from 'lucide-react';
import { useAppDispatch, useFavorites } from '@redux/hooks';
import { addFavorite } from '@/app/_redux/favorite/favorites-actions';

interface PostFavoriteData {
  mediaType: MediaType;
  mediaId: number;
  isFavorite: boolean;
}

interface ToggleFavoriteProps extends Omit<PostFavoriteData, 'isFavorite'> {}

export function ToggleFavorite({ mediaId, mediaType }: ToggleFavoriteProps) {
  const dispatch = useAppDispatch();
  const { favorites } = useFavorites();
  const isFavorite = favorites.includes(mediaId);

  async function postFavorite() {
    return dispatch(
      addFavorite({
        mediaId,
        mediaType,
        isFavorite,
      })
    );
  }

  return (
    <Button
      className='h-7 w-7'
      onClick={postFavorite}
      size='icon'
      variant='outline'
    >
      <Heart
        className={cn('h-5 w-5', isFavorite && 'fill-red-500 text-red-500')}
      />
    </Button>
  );
}
