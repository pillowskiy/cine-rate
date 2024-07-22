import Link from 'next/link';
import { getPopular } from '#actions/getPopular';
import { MediaType } from '#config/enums';
import { PersonArticle } from '#components/article/person-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import { TitledSection } from '#components/section/titled';
import { SeeMoreResources } from '#components/see-more-resources';

export default async function CelebrityCarousel() {
  const [celebrities, error] = await getPopular(MediaType.Person);

  if (error) return null;

  return (
    <TitledSection
      title='Celebrities'
      subTitle='The most popular celebrities.'
      badges={['👑 Iconic Idols']}
    >
      {celebrities.results.length ? (
        <Carousel>
          {celebrities.results.map((celebrity, i) => (
            <PersonArticle
              custom={i}
              key={celebrity.id}
              celebrity={celebrity}
              className='w-[160px] sm:w-[260px]'
            />
          ))}
          <SeeMoreResources
            href='/celebrities'
            icon={'⭐'}
            colorSchema='red'
            aspect='vertical'
          />
        </Carousel>
      ) : (
        <NotFound />
      )}
    </TitledSection>
  );
}
