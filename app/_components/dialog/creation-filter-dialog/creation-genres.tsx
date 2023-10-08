'use client';

import { useContext } from 'react';
import type { GenresResponse } from '@app/types/genre-types';
import type { MediaType } from '@config/enums';
import { Toggle } from '@ui/toggle';
import { Label } from '@ui/label';
import { ChevronDown, Loader } from 'lucide-react';
import { FilterContext } from '.';
import useFetch from '@hooks/useFetch';

interface CreationGenresProps {
  mediaType: MediaType;
}

export function CreationGenres({ mediaType }: CreationGenresProps) {
  const [filter, setFilter] = useContext(FilterContext);
  const genreIds = filter.with_genres?.split(',').map(Number) || [];

  const { data, error } = useFetch<GenresResponse>(`/api/${mediaType}/genres/`);

  if (!data && !error) {
    return (
      <div className='flex w-full items-center justify-between rounded-md border py-2 px-3'>
        <div className='flex items-center'>
          <Loader className='mr-1.5 h-6 w-6 animate-spin' />
          <span className='animate-pulse text-sm'>Loading genres..</span>
        </div>
        <ChevronDown className='w-4 h-4 text-foreground/50' />
      </div>
    );
  }

  if (!data?.genres.length) return null;

  const removeGenre = (genreId: number) => {
    setFilter((prev) => ({
      ...prev,
      with_genres: genreIds.filter((id) => genreId !== id).toString(),
    }));
  };

  const addGenre = (genreId: number) => {
    setFilter((prev) => ({
      ...prev,
      with_genres: genreIds.concat(genreId).toString(),
    }));
  };

  return (
    <div className='grid w-full items-center gap-2'>
      <Label>Genres</Label>
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
