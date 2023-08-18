import { buildImagePath } from '@libs/tmdb';
import { getMovieDetails } from '@actions/getMovieDetails';
import Image from 'next/image';
import getColors from 'get-image-colors';
import { getDarkestColor } from '@libs/get-image.colors';
import { YoutubePlayer } from '@components/youtube-player';
import { FileVideo, FileImage } from 'lucide-react';
import { getVideos } from '@actions/getVideos';
import { buildURL } from '@/app/_libs/ytdl';
import { MovieCast } from './movie-cast';
import { SimilarCreations } from './similar-creations';

interface MoviePageProps {
  params: { id?: string | undefined };
}

export default async function MoviePage({ params }: MoviePageProps) {
  if (!params.id || isNaN(+params.id)) return null;
  const { data: movie } = await getMovieDetails(+params.id, {});
  const { data: videos } = await getVideos(movie.id);

  if (!movie || !videos) return null;

  // TEMP
  const officialTrailer = videos.results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  const video = officialTrailer || videos.results[0];

  const colors = await getColors(buildImagePath(movie.backdrop_path));
  const { color } = getDarkestColor(colors);

  return (
    <div className='mt-4 min-h-screen w-full space-y-6'>
      <header className='relative p-4 text-primary-foreground'>
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

        <div className='jutisfy-between my-4 flex flex-col flex-wrap gap-4 md:flex-row lg:flex-wrap'>
          <figure className='sm:flex-[1 1 260px] w-full overflow-hidden rounded-md md:w-[260px]'>
            <Image
              className={
                'h-full w-full object-cover transition-all ease-in-out hover:scale-105'
              }
              src={buildImagePath(movie.poster_path)}
              alt='Movie Image'
              width={260}
              height={420}
            />
          </figure>

          <div className='flex-grow'>
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
            src={buildImagePath(movie.backdrop_path)}
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

      <MovieCast movie={movie} />
      <SimilarCreations movieId={movie.id} />
    </div>
  );
}
