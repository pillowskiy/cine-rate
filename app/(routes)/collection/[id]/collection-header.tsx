import { ImageFromPath } from '@/app/_components/image/image-from-path';
import { buildImagePath } from '@/app/_libs/tmdb';
import type { IDetailedCollection } from '@app/types/collection-types';
import Link from 'next/link';

interface CollectionHeaderProps {
  details: IDetailedCollection;
}

export default function CollectionHeader({ details }: CollectionHeaderProps) {
  const lastRealese = details.parts.findLast((el) => !!el.release_date);
  return (
    <header className='flex w-full flex-col items-center gap-4 overflow-hidden rounded-md border p-4 sm:flex-row'>
      <div className='w-full sm:w-fit'>
        <ImageFromPath
          className='block w-full rounded-md min-w-[160px] sm:w-[160px]'
          alt='Series Poster'
          src={buildImagePath({
            path: details.backdrop_path,
            scale: 'backdrop',
          })}
          width={260}
          height={390}
        />
      </div>
      <div className='flex flex-grow flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='text-center sm:text-left sm:max-w-[80%]'>
          <h3 className='text-xl'>{details.name}</h3>
          <p className='text-sm text-foreground/70'>{details.overview}</p>
        </div>

        <div className='h-full'>
          <p className='truncate text-sm'>
            <b>Number of movies:</b> {details.parts.length}
          </p>
          {!!lastRealese && (
            <p className='truncate text-sm'>
              <b>Last realese:</b>{' '}
              {new Date(lastRealese.release_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
