import { Expand, Star } from 'lucide-react';
import type { MediaType } from '#config/enums';
import { CreationTrailer } from '#components/creation/creation-trailer';
import { ImageFromPath } from '#components/image/image-from-path';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import { ExpandImageDialog } from '../dialog/expand-image-dialog';
import { CreationStatesDetailed } from './account-states';
import type { CreationDetailsProps } from './common/types';
import { getRealesedDate, getTitle } from './common/utils';
import { CreationGenres } from './creation-genres';

interface CreationHeaderProps extends CreationDetailsProps {
  mediaType: MediaType;
}

export default async function MovieHeader({
  details,
  mediaType,
}: CreationHeaderProps) {
  const posterPath = buildImagePath({
    path: details.poster_path,
    scale: 'poster',
  });

  return (
    <header className='relative py-4 text-white sm:px-4'>
      <div
        className={cn(
          'absolute -left-4 top-0 -z-50 h-full w-screen overflow-hidden bg-black sm:left-0 sm:w-full sm:rounded-md',
          'after:absolute after:inset-0 after:bg-gradient-to-r after:from-black'
        )}
      >
        <ImageFromPath
          className={
            'aspect-[16/9] size-full scale-110 select-none object-cover object-top blur-sm'
          }
          src={buildImagePath({
            path: details.backdrop_path,
            scale: 'large_backdrop',
          })}
          alt='Movie Backdrop'
          width={1000}
          height={450}
          priority
          loading='eager'
        />
      </div>

      <div className='flex flex-col justify-between gap-4 sm:flex-row'>
        <div className='space-y-1'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
            <h2 className='max-w-[600px] truncate text-2xl font-semibold tracking-tight'>
              {getTitle(details)}
            </h2>
            <div>
              <p className='truncate text-xs opacity-70 sm:text-sm'>
                {getRealesedDate(details)}
              </p>
            </div>
          </div>
          <CreationGenres
            className='hidden truncate sm:flex'
            genres={details.genres}
            mediaType={mediaType}
          />
        </div>

        <CreationStatesDetailed creationId={details.id} mediaType={mediaType} />
      </div>

      <div className='my-4 flex flex-col sm:flex-row sm:gap-4'>
        <ExpandImageDialog
          path={details.poster_path}
          alt={`${getTitle(details)} posters`}
        >
          <button
            aria-label='Expand Creation Poster'
            className='relative hidden flex-[25%] cursor-pointer overflow-hidden rounded-md sm:block'
          >
            <ImageFromPath
              className='h-full w-auto select-none object-cover'
              src={posterPath}
              alt='Creation Poster'
              width={260}
              height={460}
              loading='eager'
              priority
            />
            {!!posterPath && (
              <div
                className={cn(
                  'absolute inset-0 grid size-full place-items-center bg-black/30 opacity-0',
                  'backdrop-blur-sm transition-opacity duration-300 hover:opacity-100'
                )}
              >
                <div className='m-auto w-fit text-center'>
                  <Expand className='sm:size-[48px] md:size-[64px]' />
                  <p className='font-semibold'>Expand</p>
                </div>
              </div>
            )}
          </button>
        </ExpandImageDialog>
        <CreationTrailer
          className='aspect-[16/9] h-full flex-[70%] rounded-t-md sm:w-auto sm:rounded-md'
          creationId={details.id}
          mediaType={mediaType}
        />

        <figure className='flex w-full flex-[20%] gap-4 overflow-hidden sm:flex-col'>
          <div className='grid h-auto w-full place-items-center rounded-b-md p-2 backdrop-blur-[25px] sm:h-full sm:rounded-md'>
            <div
              className='m-auto flex cursor-pointer items-center gap-1 text-center sm:flex-col'
              aria-label='REVIEWS'
            >
              <div className='relative'>
                <Star className='m-auto size-5 fill-yellow-500 text-yellow-500 sm:size-[48px] md:size-[64px]' />
                <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 translate-y-[-40%] sm:block'>
                  <span className='select-none text-sm sm:text-base'>
                    {details.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className='text-sm font-medium uppercase'>Rating</p>
            </div>
          </div>
          <div className='grid h-auto w-full place-items-center rounded-b-md p-2 backdrop-blur-[25px] sm:h-full sm:rounded-md'>
            <div className='m-auto flex items-center gap-1 text-center sm:flex-col'>
              <h2 className='select-none text-lg font-medium uppercase leading-none sm:text-3xl md:text-4xl'>
                {details.popularity.toFixed()}
              </h2>
              <span className='text-sm font-medium uppercase'>Popularity</span>
            </div>
          </div>
        </figure>
      </div>
    </header>
  );
}
