import type { CreationDetailsProps } from './common/types';
import type { MediaType } from '@config/enums';

import { Expand, Star } from 'lucide-react';
import { CreationTrailer } from '@components/creation/creation-trailer';
import { buildImagePath } from '@libs/tmdb';
import { ImageFromPath } from '@components/image/image-from-path';
import { getRealesedDate, getTitle } from './common/utils';
import { CreationReviewsDialog } from './creation-reviews-dialog';
import { CreationStatesDetailed } from './account-states';
import { CreationGenres } from './creation-genres';
import { ExpandImageDialog } from '../dialog/expand-image-dialog';
interface CreationHeaderProps extends CreationDetailsProps {
  mediaType: MediaType;
}

export default async function MovieHeader({
  details,
  mediaType,
}: CreationHeaderProps) {
  return (
    <header className='relative py-4 text-white sm:px-4'>
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
          <div className='relative hidden flex-[25%] cursor-pointer overflow-hidden rounded-md sm:block'>
            <ImageFromPath
              className='h-full w-auto select-none object-cover'
              src={buildImagePath({
                path: details.poster_path,
                scale: 'poster',
              })}
              alt='Creation Poster'
              width={260}
              height={460}
              priority
            />
            <div className='absolute inset-0 grid h-full w-full place-items-center bg-black/30 opacity-0 backdrop-blur-sm transition-all hover:opacity-100'>
              <div className='m-auto w-fit text-center'>
                <Expand className='sm:h-[48px] sm:w-[48px] md:h-[64px] md:w-[64px]' />
                <p className='font-semibold'>Expand</p>
              </div>
            </div>
          </div>
        </ExpandImageDialog>
        <CreationTrailer
          className='aspect-[16/9] h-full flex-[70%] rounded-t-md sm:w-auto sm:rounded-md'
          creationId={details.id}
          mediaType={mediaType}
        />

        <figure className='flex w-full flex-[20%] gap-4 overflow-hidden sm:flex-col'>
          <div className='grid h-auto w-full place-items-center rounded-b-md p-2 backdrop-blur-[25px] sm:h-full sm:rounded-md'>
            <CreationReviewsDialog
              creationId={details.id}
              mediaType={mediaType}
            >
              <div className='m-auto flex cursor-pointer items-center gap-1 text-center sm:flex-col'>
                <div className='relative'>
                  <Star className='m-auto h-5 w-5 fill-yellow-500 text-yellow-500 sm:h-[48px] sm:w-[48px] md:h-[64px] md:w-[64px]' />
                  <div className='absolute left-[50%] top-[50%] hidden -translate-x-[50%] -translate-y-[50%] sm:block'>
                    <span className='select-none text-sm leading-none sm:text-base'>
                      {details.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className='text-sm font-medium uppercase transition-all hover:underline'>
                  Reviews
                </p>
              </div>
            </CreationReviewsDialog>
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

      <div className='absolute -left-4 top-0 -z-20 h-full w-screen overflow-hidden bg-black sm:left-0 sm:w-full sm:rounded-md'>
        <ImageFromPath
          className={
            'aspect-[16/9] h-full w-full scale-110 select-none object-cover object-top'
          }
          src={buildImagePath({
            path: details.backdrop_path,
            scale: 'large_backdrop',
          })}
          alt='Movie Image'
          width={1000}
          height={450}
          priority
        />
        <div
          className={
            'absolute left-0 top-0 h-full w-full bg-black/20 bg-gradient-to-r backdrop-blur-[6px]'
          }
        />
      </div>
    </header>
  );
}
