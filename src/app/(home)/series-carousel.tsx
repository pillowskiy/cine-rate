import Link from 'next/link';
import { getTV } from '#actions/getTV';
import { MediaType, TVSort } from '#config/enums';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { TitledSection } from '#components/section/titled';
import { SeeMoreResources } from '#components/see-more-resources';
import { capitalize } from '#libs/index';

const emojis: Record<TVSort, string> = {
  [TVSort.AiringToday]: '🍿',
  [TVSort.OnTheAir]: '🎥',
  [TVSort.Popular]: '🔥',
  [TVSort.TopRated]: '⭐',
};

async function CreationCarousel({ sort }: { sort: TVSort }) {
  const [data, error] = await getTV(sort);

  if (error) return null;

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
      <SeeMoreResources
        href='/tv'
        icon={'📺'}
        colorSchema='green'
        aspect='horizontal'
      />
    </Carousel>
  );
}

export default function SeriesCarousel() {
  return (
    <TitledSection
      title='Movies that Conquer the World!'
      subTitle='The most popular blockbusters and unforgettable masterpieces.'
    >
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
    </TitledSection>
  );
}
