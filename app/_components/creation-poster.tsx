import Image, { type ImageProps } from 'next/image';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '../_libs';

interface CreationPoster extends Omit<ImageProps, 'alt' | 'src'> {
  alt?: string;
  className?: string;
  posterPath: string;
}

export function CreationPoster({
  posterPath,
  alt,
  className,
  ...props
}: CreationPoster) {
  return (
    <figure className={cn('w-full overflow-hidden rounded-md', className)}>
      <Image
        className={
          'w-full object-cover transition-all ease-in-out hover:scale-105'
        }
        src={buildImagePath(posterPath)}
        alt={alt || 'Creation Poster'}
        {...props}
      />
    </figure>
  );
}
