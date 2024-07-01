import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@/app/_libs';
import type { IPartialGenre } from '@app/types/genre-types';
import type { MediaType } from '@config/enums';
import { Button } from '@ui/button';

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
            className='h-full truncate bg-transparent px-2 text-xs'
            variant='outline'
          >
            {genre.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
