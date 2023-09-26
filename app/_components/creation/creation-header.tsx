import type { CreationDetailsProps } from './common/types';
import type { MediaType } from '@config/enums';

import Link from 'next/link';

import { Button } from '@ui/button';
import { Star } from 'lucide-react';
import { YoutubePlayer } from '@components/youtube-player';
import { buildImagePath } from '@libs/tmdb';
import { buildURL } from '@libs/ytdl';
import { getCreationVideos } from '@actions/getCreationVideos';
import { ImageFromPath } from '@components/image/image-from-path';
import { getRealesedDate, getTitle } from './common/utils';
import { CreationReviewsDialog } from './creation-reviews-dialog';
import { CreationStatesDetailed } from './account-states';
interface CreationHeaderProps extends CreationDetailsProps {
  mediaType: MediaType;
}

export default async function MovieHeader({
  details,
  mediaType,
}: CreationHeaderProps) {
  // TEMP: to tmdb utils
  const { data: videos } = await getCreationVideos(details.id, mediaType);
  const officialTrailer = videos.results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  const video = videos.results.length
    ? officialTrailer || videos.results[0]
    : null;

  return (
    <header className='relative my-4 p-4 text-white'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row'>
        <div className='space-y-1'>
          <div className='flex items-center space-x-2'>
            <h2 className='max-w-[600px] truncate text-2xl font-semibold tracking-tight'>
              {getTitle(details)}
            </h2>
            <div>
              <p className='truncate text-xs opacity-70 sm:text-sm'>
                {getRealesedDate(details)}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-1.5 overflow-auto truncate text-sm opacity-70'>
            {details.genres.map((genre) => (
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
                  className='h-7 border-white/70 bg-transparent px-2 text-xs text-white/70'
                  variant='outline'
                >
                  {genre.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <CreationStatesDetailed creationId={details.id} mediaType={mediaType} />
      </div>

      <div className='jutisfy-between my-4 flex flex-col md:flex-row md:gap-4'>
        <div className='flex-[25%] overflow-hidden rounded-md'>
          <ImageFromPath
            className='hidden h-full w-auto object-cover sm:block'
            src={buildImagePath({ path: details.poster_path, scale: 'poster' })}
            alt='Creation Poster'
            width={260}
            height={460}
            priority
          />
        </div>
        <YoutubePlayer
          className='aspect-[16/9] h-full flex-[70%] rounded-t-md sm:w-auto sm:rounded-md'
          // TEMP
          url={buildURL(video?.key || '')}
        />

        <figure className='flex w-full flex-[20%] gap-4 overflow-hidden md:flex-col'>
          <div className='backdrop-blur-5 grid h-auto w-full place-items-center rounded-b-md p-2 backdrop-blur-[25px] md:h-full md:rounded-md'>
            <CreationReviewsDialog
              creationId={details.id}
              mediaType={mediaType}
            >
              <div className='m-auto flex cursor-pointer items-center gap-1 text-center md:flex-col'>
                <div className='relative'>
                  <Star className='m-auto h-5 w-5 fill-yellow-500 text-yellow-500 md:h-[64px] md:w-[64px]' />
                  <div className='absolute left-[50%] top-[50%] hidden -translate-x-[50%] -translate-y-[50%] sm:block'>
                    <span className='select-none text-sm leading-none md:text-base'>
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
          <div className='backdrop-blur-5 grid h-auto w-full place-items-center rounded-b-md p-2 backdrop-blur-[25px] md:h-full md:rounded-md'>
            <div className='m-auto flex items-center gap-1 text-center md:flex-col'>
              <h2 className='select-none text-lg font-medium uppercase leading-none md:text-4xl'>
                {details.popularity.toFixed()}
              </h2>
              <span className='text-sm font-medium uppercase'>Popularity</span>
            </div>
          </div>
        </figure>
      </div>

      <div className='absolute left-0 top-0 -z-20 h-full w-full overflow-hidden rounded-md bg-black'>
        <ImageFromPath
          className={
            'aspect-[16/9] h-full w-full scale-110 object-cover object-top'
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
