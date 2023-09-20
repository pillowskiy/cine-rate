import { MediaType } from '@app/types/index';
import { Separator } from '@ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs';
import { CreationArticle } from '@components/article/creation-article';
import { Heading } from '@components/heading';
import { Carousel } from '@components/carousel';
import { Sort, getMovies } from '@actions/getMovies';
import { capitalize } from '@libs/index';

async function CreationCarousel({ sort }: { sort: Sort }) {
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
      <Tabs defaultValue={Sort.Popular}>
        <TabsList className='w-full md:w-fit'>
          {Object.values(Sort).map((value) => (
            <TabsTrigger key={value} value={value}>
              {capitalize(value, { split: '_' })}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(Sort).map((value) => (
          <TabsContent key={value} value={value}>
            <CreationCarousel sort={value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
