import { Heading } from '@components/heading';
import { getTrending } from '@actions/getTrending';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';

export default async function TrendsCarousel() {
  const { data: creations } = await getTrending().catch(() => ({ data: null }));

  // TEMP
  if (!creations) return null;

  return (
    <section>
      <Heading
        title='Trends now'
        description='The most popular movies and TV series today.'
        badges={['🔥 The hotest']}
      />
      <Separator className='my-4' />
      <Carousel>
        {creations.results.map((creation) => (
          <CreationArticle
            key={creation.id}
            creation={creation}
            className='w-[260px]'
            width={260}
            height={390}
          />
        ))}
      </Carousel>
    </section>
  );
}
