import { Separator } from '@ui/separator';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Sort, getTV } from '@actions/getTV';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import { capitalize } from '@libs/index';

async function CreationCarousel({ sort }: { sort: Sort }) {
  const { data } = await getTV(sort).catch(() => ({
    data: null,
  }));

  if (!data) return;

  return (
    <Carousel>
      {data.results.map((creation) => (
        <CreationArticle
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

export default function SeriesCarousel() {
  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Captivating Series
          </h2>
          <p className='text-sm text-muted-foreground'>
            The most popular and widely known TV series.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <Tabs defaultValue={Sort.TopRated}>
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
