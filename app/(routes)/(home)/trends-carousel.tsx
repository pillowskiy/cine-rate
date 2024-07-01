import { getTrending } from '@actions/getTrending';
import { MSeparator } from '@ui/separator';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Heading } from '@components/heading';
import { NotFound } from '@components/not-found';

export default async function TrendsCarousel() {
  const [creations, error] = await getTrending();

  if (error) return null;

  return (
    <section>
      <Heading
        title='Trends now'
        description='The most popular movies and TV series today.'
        badges={['🔥 The hotest']}
      />
      <MSeparator className='my-4' />
      {creations.results.length ? (
        <Carousel>
          {creations.results.map((creation, i) => (
            <CreationArticle
              custom={i}
              key={creation.id}
              creation={creation}
              className='w-[160px] sm:w-[260px]'
              width={260}
              height={390}
            />
          ))}
        </Carousel>
      ) : (
        <NotFound />
      )}
    </section>
  );
}
