import { ComponentProps } from 'react';
import Link from 'next/link';
import type { IPartialGenre } from '#types/genre-types';
import type { MediaType } from '#config/enums';
import { Button } from '#ui/button';
import { cn } from '#libs/index';

interface CreationGenresProps extends Omit<ComponentProps<'div'>, 'children'> {
  mediaType?: MediaType;
  genres: IPartialGenre[];
}

export function CreationGenres({
  genres,
  mediaType,
  className,
  ...props
}: CreationGenresProps) {
  return (
    <div
      className={cn(
        'flex h-7 items-center space-x-2 overflow-x-auto text-sm opacity-70',
        className
      )}
      {...props}
    >
      {genres.map((genre) => (
        <Button
          key={genre.id}
          className='h-full truncate bg-transparent px-2 text-xs'
          variant='outline'
          asChild
        >
          <Link
            href={{
              pathname: `/${mediaType}`,
              query: {
                with_genres: genre.id,
              },
            }}
          >
            {genre.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
