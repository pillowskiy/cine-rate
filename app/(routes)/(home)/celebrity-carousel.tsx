import { MediaType } from '@app/types/index';
import { PersonArticle } from '@components/article/person-article';
import { Carousel } from '@components/carousel';
import { getPopular } from '@actions/getPopular';
import { Separator } from '@ui/separator';

export default async function CelebrityCarousel() {
  const { data: celebrities } = await getPopular(MediaType.Person).catch(
    () => ({ data: null })
  );

  // TEMP
  if (!celebrities) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Celebrities</h2>
          <p className='text-sm text-muted-foreground'>
            The most popular celebrities.
          </p>
        </div>
      </div>
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
