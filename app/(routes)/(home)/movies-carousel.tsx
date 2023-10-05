import { MediaType, MovieSort } from '@config/enums';
import { MSeparator } from '@ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs';
import { CreationArticle } from '@components/article/creation-article';
import { Heading } from '@components/heading';
import { Carousel } from '@components/carousel';
import { getMovies } from '@actions/getMovies';
import { capitalize } from '@libs/index';
import Link from 'next/link';

const emojis: Record<MovieSort, string> = {
  [MovieSort.NowPlaying]: '🎥',
  [MovieSort.Upcoming]: '🆕',
  [MovieSort.Popular]: '🔥',
  [MovieSort.TopRated]: '⭐',
};

async function CreationCarousel({ sort }: { sort: MovieSort }) {
  const [data, error] = await getMovies(sort);

  if (error) return null;

  return (
    <Carousel>
      {data.results.map((creation, i) => (
        <CreationArticle
          custom={i}
          defaultMediaType={MediaType.Movie}
          aspect='horizontal'
          key={creation.id}
          creation={creation}
          className='w-[260px]'
          size='sm'
          width={260}
          height={140}
        />
      ))}
      {/* TEMP */}
      <div className='relative grid aspect-[16/9] h-fit w-[260px] place-items-center rounded-md border'>
        <Link
          href='/movie'
          className='z-10 cursor-pointer select-none space-y-1 text-center'
        >
          <h2 className='text-4xl shadow-cyan-500 drop-shadow-md'>🎥</h2>
          <p className='transition-all hover:text-cyan-500 hover:underline'>
            See more!
          </p>
        </Link>

        <div className='absolute -z-10 h-10 w-10 animate-pulse rounded-full bg-cyan-500 blur-xl' />
        <div className='absolute -z-10 h-5 w-5 animate-pulse rounded-full bg-blue-600 blur-xl' />
      </div>
    </Carousel>
  );
}

export default function MoviesCarousel() {
  return (
    <section>
      <Heading
        title='Movies that Conquer the World!'
        description='The most popular blockbusters and unforgettable masterpieces.'
      />
      <MSeparator className='my-4' />
      <Tabs defaultValue={MovieSort.Popular}>
        <TabsList>
          {Object.values(MovieSort).map((value) => (
            <TabsTrigger
              className='flex items-center gap-1'
              key={value}
              value={value}
            >
              {emojis[value]}
              <span className='hidden sm:block'>
                {capitalize(value, { split: '_' })}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(MovieSort).map((value) => (
          <TabsContent key={value} value={value}>
            <CreationCarousel sort={value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
