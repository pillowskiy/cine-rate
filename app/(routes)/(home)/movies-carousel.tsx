import { MediaType, MovieSort } from '@config/enums';
import { Separator } from '@ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs';
import { CreationArticle } from '@components/article/creation-article';
import { Heading } from '@components/heading';
import { Carousel } from '@components/carousel';
import { getMovies } from '@actions/getMovies';
import { capitalize } from '@libs/index';

async function CreationCarousel({ sort }: { sort: MovieSort }) {
  const { data } = await getMovies(sort).catch(() => ({
    data: null,
  }));

  if (!data) return;

  return (
    <Carousel>
      {data.results.map((creation) => (
        <CreationArticle
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
      <Separator className='my-4' />
      <Tabs defaultValue={MovieSort.Popular}>
        <TabsList className='w-full md:w-fit'>
          {Object.values(MovieSort).map((value) => (
            <TabsTrigger key={value} value={value}>
              {capitalize(value, { split: '_' })}
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
