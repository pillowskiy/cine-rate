import { getTrending } from '#actions/getTrending';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import { TitledSection } from '#components/section/titled';

export default async function TrendsCarousel() {
  const [creations, error] = await getTrending();

  if (error) return null;

  return (
    <TitledSection
      title='Trends now'
      subTitle='The most popular movies and TV series today.'
      badges={['🔥 The hotest']}
    >
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
    </TitledSection>
  );
}
