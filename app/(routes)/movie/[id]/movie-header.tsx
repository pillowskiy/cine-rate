import type { IMovieDetails } from '@app/types/movies-types';
import { MediaType } from '@app/types/index';
import { YoutubePlayer } from '@components/youtube-player';
import { BaseFigure } from '@components/figure/base-figure';
import { FileImage, FileVideo } from 'lucide-react';
import Image from 'next/image';
import getColors from 'get-image-colors';
import { getDarkestColor } from '@libs/get-image.colors';
import { buildImagePath } from '@libs/tmdb';
import { buildURL } from '@libs/ytdl';
import { getCreationVideos } from '@actions/getCreationVideos';

interface CreationHeaderProps {
  movie: IMovieDetails;
}

export default async function MovieHeader({ movie }: CreationHeaderProps) {
  const { data: videos } = await getCreationVideos(movie.id, MediaType.Movie);
  const officialTrailer = videos.results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  const video = officialTrailer || videos.results[0];

  const colors = await getColors(buildImagePath({ path: movie.backdrop_path, scale: 'backdrop' }));
  const { color } = getDarkestColor(colors);

  return (
    <header className='relative my-4 p-4 text-primary-foreground'>
      <div className='space-y-1'>
        <div className='flex items-center space-x-2'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            {movie.title || movie.original_title}
          </h2>
          <p className='text-sm opacity-70'>{movie.release_date}</p>
        </div>
        <p className='text-sm opacity-90'>
          {movie.genres.map((genre) => genre.name).join(', ')}
        </p>
      </div>

      <div className='jutisfy-between my-4 flex flex-col flex-wrap gap-4 sm:flex-row lg:flex-wrap'>
        <BaseFigure
          className='md:flex-[1 1 260px] w-[260px] hidden sm:block'
          posterPath={movie.poster_path}
          width={260}
          height={420}
        />
        <div className='sm:flex-grow'>
          <YoutubePlayer
            className='h-full w-full'
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

      <div className='w-full space-y-4 md:w-[260px] md:min-w-[260px]'>
        <div className='flex items-center space-x-1.5 overflow-auto truncate text-sm opacity-70'>
          {movie.genres.map((genre) => (
            <span className='rounded-md border p-1 text-xs' key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <div className='absolute left-0 top-0 -z-20 h-full w-full overflow-hidden rounded-md'>
        <Image
          className={
            'aspect-[16/9] h-full w-full scale-110 object-cover object-top'
          }
          src={buildImagePath({ path: movie.backdrop_path })}
          alt='Movie Image'
          width={1920}
          height={1080}
        />
        <div
          style={{
            backgroundImage: `linear-gradient(to left, rgba(255,0,0,0), ${color.hex()})`,
          }}
          className={
            'absolute left-0 top-0 h-full w-full bg-gradient-to-r backdrop-blur-sm'
          }
        />
      </div>
    </header>
  );
}
