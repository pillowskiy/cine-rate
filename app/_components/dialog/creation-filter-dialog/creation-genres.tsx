'use client';

import { useContext, useEffect, useState } from 'react';
import type { GenresResponse } from '@app/types/genre-types';
import type { MediaType } from '@config/enums';
import { Toggle } from '@ui/toggle';
import { Label } from '@ui/label';
import { Loader } from 'lucide-react';
import { FilterContext } from '.';
import axios from 'axios';

interface CreationGenresProps {
  mediaType: MediaType;
}

export function CreationGenres({ mediaType }: CreationGenresProps) {
  const [genres, setGenres] = useState<GenresResponse['genres'] | null>(null);
  const [filter, setFilter] = useContext(FilterContext);
  const { with_genres } = filter;
  const genreIds = with_genres?.split(',').map(Number) || [];

  useEffect(() => {
    axios
      .get<GenresResponse>('/api/genres/', { params: { mediaType } })
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch(() => {
        setGenres([]);
      });
  }, [mediaType]);

  if (!genres) {
    return (
      <div className='grid place-items-center'>
        <Loader className='h-8 w-8' />
      </div>
    );
  }

  if (!genres.length) return null;

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
        {genres.map((genre) => (
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
