import { MediaType } from '@app/types/index';
import { PersonArticle } from '@components/article/person-article';
import { Carousel } from '@components/carousel';
import { getPopular } from '@actions/getPopular';
import { Separator } from '@ui/separator';
import { Heading } from '@components/heading';

export default async function CelebrityCarousel() {
  const { data: celebrities } = await getPopular(MediaType.Person).catch(
    () => ({ data: null })
  );

  // TEMP
  if (!celebrities) return null;

  return (
    <section>
      <Heading
        title='Celebrities'
        description='The most popular celebrities.'
      />
      <Separator className='my-4' />
      <Carousel>
        {celebrities.results.map((celebrity) => (
          <PersonArticle
            key={celebrity.id}
            celebrity={celebrity}
            className='w-[260px]'
          />
        ))}
      </Carousel>
    </section>
  );
}
