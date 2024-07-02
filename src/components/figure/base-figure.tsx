import { type ImageProps } from 'next/image';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import { ImageFromPath } from '../image/image-from-path';

interface BaseFigureProps extends Omit<ImageProps, 'alt' | 'src'> {
  alt?: string;
  className?: string;
  path: string;
  scale?: 'poster' | 'backdrop';
}

export function BaseFigure({
  path,
  alt,
  className,
  scale = 'poster',
  ...props
}: BaseFigureProps) {
  return (
    <figure className={cn('w-full overflow-hidden rounded-md', className)}>
      <ImageFromPath
        className={
          'h-auto w-full object-cover transition-all ease-in-out hover:scale-105'
        }
        src={buildImagePath({ path, scale })}
        alt={alt || 'Creation Poster'}
        {...props}
      />
    </figure>
  );
}
