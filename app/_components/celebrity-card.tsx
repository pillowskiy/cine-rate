import type { HtmlHTMLAttributes } from 'react';
import type { ICelebrity } from '../_types/celebrity-types';
import { buildImagePath } from '../_libs/tmdb';
import { cn } from '../_libs';
import Image from 'next/image';

interface PersonCardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  celebrity: ICelebrity;
}

export function CelebrityCard({
  celebrity,
  className,
  ...props
}: PersonCardProps) {
  return (
    <article className={cn('space-y-2', className)} {...props}>
      <figure className='overflow-hidden rounded-md'>
        <Image
          className='aspect-[4/6] h-auto w-auto object-cover object-center transition-all ease-in-out hover:scale-105'
          src={buildImagePath(celebrity.profile_path)}
          alt='Person Avatar'
          width={480}
          height={854}
        />
      </figure>
      <div className='space-y-1'>
        <h2 className='text-md truncate font-semibold tracking-tight'>
          {celebrity.name}
        </h2>
        <div className='items-cebter flex justify-between text-xs'>
          <span>{celebrity.known_for_department}</span>
          <span>{celebrity.popularity.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
