import Link from 'next/link';
import { getMovies } from '#actions/getMovies';
import { MediaType, MovieSort } from '#config/enums';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { TitledSection } from '#components/section/titled';
import { capitalize } from '#libs/index';

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

        <div className='absolute -z-10 size-10 animate-pulse rounded-full bg-cyan-500 blur-xl' />
        <div className='absolute -z-10 size-5 animate-pulse rounded-full bg-blue-600 blur-xl' />
      </div>
    </Carousel>
  );
}

export default function MoviesCarousel() {
  return (
    <TitledSection
      title='Movies that Conquer the World!'
      subTitle='The most popular blockbusters and unforgettable masterpieces.'
    >
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
    </TitledSection>
  );
}
