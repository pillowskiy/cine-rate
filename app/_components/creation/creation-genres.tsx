import { cn } from '@/app/_libs';
import type { IPartialGenre } from '@app/types/genre-types';
import type { MediaType } from '@config/enums';
import { Button } from '@ui/button';
import Link from 'next/link';
import { ComponentProps } from 'react';

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
        'flex h-7 items-center space-x-2 text-sm opacity-70 overflow-x-auto',
        className
      )}
      {...props}
    >
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={{
            pathname: `/${mediaType}`,
            query: {
              with_genres: genre.id,
            },
          }}
          passHref
          legacyBehavior
        >
          <Button
            className='h-full bg-transparent px-2 text-xs truncate'
            variant='outline'
          >
            {genre.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
