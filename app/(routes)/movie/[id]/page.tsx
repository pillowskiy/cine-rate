import { buildImagePath } from '@libs/tmdb';
import { getMovieDetails } from '@actions/getMovieDetails';
import Image from 'next/image';
import getColors from 'get-image-colors';
import { getDarkestColor } from '@libs/get-image.colors';
import { cn } from '@libs/index';

interface MoviePageProps {
  params: { id?: string | undefined };
}

function getBrightness(hex: string) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000;
}

export default async function MoviePage({ params }: MoviePageProps) {
  if (!params.id || isNaN(+params.id)) return null;
  const { data: movie } = await getMovieDetails(+params.id, {});
  const colors = await getColors(buildImagePath(movie.backdrop_path));
  const { color } = getDarkestColor(colors);
  if (!movie) return null;

  return (
    <div className='mt-4 min-h-screen w-full'>
      <header className='relative flex gap-8 p-8'>
        <div className='w-[260px] min-w-[260px] overflow-hidden rounded-md'>
          <Image
            className={
              'object-fit aspect-[4/6] transition-all ease-in-out hover:scale-105'
            }
            src={buildImagePath(movie.poster_path)}
            alt='Movie Image'
            width={260}
            height={420}
          />
        </div>
        <div className='absolute left-0 top-0 -z-20 h-[460px] w-full overflow-hidden rounded-md'>
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

        <section className='space-y-4 text-primary-foreground'>
          <div className='space-y-1'>
            <div className='flex items-center space-x-2'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                {movie.title || movie.original_title}
              </h2>
              <p className='text-sm opacity-70'>{movie.release_date}</p>
            </div>
            <div className='flex items-center space-x-2 truncate text-sm opacity-70'>
              {movie.production_countries.map((country) => (
                <span
                  className='rounded-md border p-1 text-xs'
                  key={country.iso_3166_1}
                >
                  {country.name}
                </span>
              ))}
            </div>
            <p className='opacity-90'>
              {movie.genres.map((genre) => genre.name).join(', ')}
            </p>
          </div>

          <div className='max-w-[80%] space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              {movie.tagline}
            </h2>
            <p className='text-sm'>{movie.overview}</p>
          </div>
        </section>
      </header>
    </div>
  );
}
