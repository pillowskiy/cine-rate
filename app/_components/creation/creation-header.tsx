import type { CreationDetailsProps } from './common/types';
import type { MediaType } from '@app/types/index';

import { FileImage, FileVideo, Star, TrendingUp } from 'lucide-react';
import getColors from 'get-image-colors';
import { YoutubePlayer } from '@components/youtube-player';
import { BaseFigure } from '@components/figure/base-figure';
import { getDarkestColor } from '@libs/get-image.colors';
import { buildImagePath } from '@libs/tmdb';
import { buildURL } from '@libs/ytdl';
import { getCreationVideos } from '@actions/getCreationVideos';
import { ImageFromPath } from '@components/image/image-from-path';
import { Button } from '@ui/button';
import { getRealesedDate, getTitle } from './common/utils';
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
  const video = officialTrailer || videos.results[0];

  const colors = await getColors(
    buildImagePath({ path: details.backdrop_path, scale: 'backdrop' }) || ''
  );
  const { color } = getDarkestColor(colors);
  return (
    <header className='relative my-4 p-4 text-primary-foreground'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row'>
        <div className='space-y-1'>
          <div className='flex items-center space-x-2'>
            <h2 className='flex-grow truncate text-2xl font-semibold tracking-tight'>
              {getTitle(details)}
            </h2>
            <div className='w-max'>
              <p className='text-xs opacity-70 sm:text-sm'>
                {getRealesedDate(details)}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-1.5 overflow-auto truncate text-sm opacity-70'>
            {details.genres.map((genre) => (
              <span className='rounded-md border p-1 text-xs' key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className='flex justify-between gap-4 sm:justify-start'>
          <div className='flex flex-col items-center justify-center space-y-1 text-center'>
            <span className='text-xs font-semibold uppercase'>TMDB Rating</span>
            <Button className='text-lg' variant='ghost' size='sm'>
              <Star className='mr-1.5 h-7 w-7 fill-yellow-400 text-yellow-400' />
              <span>{details.vote_average.toFixed(1)}</span>
            </Button>
          </div>

          <div className='flex flex-col items-center justify-center space-y-1 text-center'>
            <span className='text-xs font-semibold uppercase'>Your Rating</span>
            <Button className='text-lg' variant='ghost' size='sm'>
              <Star className='mr-1.5 h-7 w-7' />
              <span>Rate</span>
            </Button>
          </div>

          <div className='flex flex-col items-center justify-center space-y-1 text-center'>
            <span className='text-xs font-semibold uppercase'>Popularity</span>
            <Button className='text-lg' variant='ghost' size='sm'>
              <TrendingUp className='mr-1.5 h-7 w-7' />
              <span>{details.popularity.toFixed(0)}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className='jutisfy-between my-4 flex flex-col flex-wrap gap-4 sm:flex-row lg:flex-wrap'>
        <BaseFigure
          className='md:flex-[1 1 260px] hidden w-[260px] sm:block'
          posterPath={details.poster_path}
          width={260}
          height={460}
        />
        <div className='h-max w-full sm:w-auto sm:flex-grow'>
          <YoutubePlayer
            className='aspect-[16/8] h-full w-full'
            url={buildURL(video.key)}
          />
        </div>

        <figure className='lg:flex-[1 1 200px] flex w-full gap-4 overflow-hidden rounded-md lg:w-[200px] lg:flex-col'>
          <div className='backdrop-blur-5 grid h-auto w-full place-items-center rounded-md p-2 backdrop-blur-[25px] md:h-full'>
            <div className='m-auto flex gap-1 space-y-1 text-center lg:flex-col'>
              <FileVideo className='m-auto h-5 w-5 md:h-[48px] md:w-[48px]' />
              <p className='text-sm font-medium uppercase'>videos</p>
            </div>
          </div>
          <div className='backdrop-blur-5 grid h-auto w-full place-items-center rounded-md p-2 backdrop-blur-[25px] md:h-full'>
            <div className='m-auto flex gap-1 space-y-1 text-center lg:flex-col'>
              <FileImage className='m-auto h-5 w-5 md:h-[48px] md:w-[48px]' />
              <p className='text-sm font-medium uppercase'>photos</p>
            </div>
          </div>
        </figure>
      </div>

      <div className='absolute left-0 top-0 -z-20 h-full w-full overflow-hidden rounded-md'>
        <ImageFromPath
          className={
            'aspect-[16/9] h-full w-full scale-110 object-cover object-top'
          }
          src={buildImagePath({
            path: details.backdrop_path,
            scale: 'large_backdrop',
          })}
          alt='Movie Image'
          width={1920}
          height={1080}
        />
        <div
          // style={{
          //   backgroundImage: `linear-gradient(to left, rgba(255,0,0,0), ${color.hex()})`,
          // }}
          className={
            'absolute left-0 top-0 h-full w-full bg-gradient-to-r backdrop-blur-sm'
          }
        />
      </div>
    </header>
  );
}
