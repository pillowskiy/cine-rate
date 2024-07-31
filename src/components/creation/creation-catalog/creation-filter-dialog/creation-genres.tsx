'use client';

import { useCallback } from 'react';
import { ChevronDown, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { GenresResponse } from '#types/genre-types';
import useFetch from '#hooks/useFetch';
import type { MediaType } from '#config/enums';
import { Label } from '#ui/label';
import { Toggle } from '#ui/toggle';
import { useCreationFilterContext } from './common/hooks';

interface CreationGenresProps {
  mediaType: MediaType;
}

export function CreationGenres({ mediaType }: CreationGenresProps) {
  const t = useTranslations('Creations.CreationCatalog.CreationsFilterDialog');
  const { filter, updateFilter } = useCreationFilterContext();
  const genreIds = filter.with_genres?.split(',').map(Number) ?? [];

  const removeGenre = useCallback(
    (genreId: number) => {
      updateFilter({
        with_genres: genreIds.filter((id) => id !== genreId).join(','),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genreIds]
  );

  const addGenre = useCallback(
    (genreId: number) => {
      updateFilter({
        with_genres: [...genreIds, genreId].join(','),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genreIds]
  );

  const { data, error } = useFetch<GenresResponse>(`/api/${mediaType}/genres/`);

  if (!data && !error) {
    return (
      <div className='flex w-full items-center justify-between rounded-md border px-3 py-2'>
        <div className='flex items-center'>
          <Loader className='mr-1.5 size-6 animate-spin' />
          <span className='animate-pulse text-sm'>Loading genres..</span>
        </div>
        <ChevronDown className='text-foreground/50 size-4' />
      </div>
    );
  }

  if (!data?.genres.length) return null;

  return (
    <div className='grid w-full items-center gap-2'>
      <Label>{t('genres')}</Label>
      <div className='flex flex-wrap gap-2'>
        {data.genres.map((genre) => (
          <Toggle
            pressed={genreIds.includes(genre.id)}
            onPressedChange={(pressed) =>
              pressed ? addGenre(genre.id) : removeGenre(genre.id)
            }
            className='h-7 border'
            key={genre.id}
            size='sm'
          >
            {genre.name}
          </Toggle>
        ))}
      </div>
    </div>
  );
}
