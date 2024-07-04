import Link from 'next/link';
import { getTV } from '#actions/getTV';
import { MediaType, TVSort } from '#config/enums';
import { MSeparator } from '#ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { Heading } from '#components/heading';
import { capitalize } from '#libs/index';

const emojis: Record<TVSort, string> = {
  [TVSort.AiringToday]: '🍿',
  [TVSort.OnTheAir]: '🎥',
  [TVSort.Popular]: '🔥',
  [TVSort.TopRated]: '⭐',
};

async function CreationCarousel({ sort }: { sort: TVSort }) {
  const [data, error] = await getTV(sort);

  if (error) return;

  return (
    <Carousel>
      {data.results.map((creation, i) => (
        <CreationArticle
          custom={i}
          defaultMediaType={MediaType.TV}
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
          className='z-10 cursor-pointer select-none space-y-1 text-center'
          href='/tv'
        >
          <h2 className='text-4xl shadow-lime-500 drop-shadow-md'>📺</h2>
          <p className='transition-all hover:text-lime-500 hover:underline'>
            See more!
          </p>
        </Link>

        <div className='absolute -z-10 size-10 animate-pulse rounded-full bg-lime-500 blur-xl' />
        <div className='absolute -z-10 size-5 animate-pulse rounded-full bg-emerald-600 blur-xl' />
      </div>
    </Carousel>
  );
}

export default function SeriesCarousel() {
  return (
    <section>
      <Heading
        title='Captivating Series'
        description='The most popular and widely known TV series.'
      />
      <MSeparator className='my-4' />
      <Tabs defaultValue={TVSort.TopRated}>
        <TabsList>
          {Object.values(TVSort).map((value) => (
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
        {Object.values(TVSort).map((value) => (
          <TabsContent key={value} value={value}>
            <CreationCarousel sort={value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
