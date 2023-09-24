import { MediaType } from '@config/enums';
import { PersonArticle } from '@components/article/person-article';
import { Carousel } from '@components/carousel';
import { getPopular } from '@actions/getPopular';
import { Separator } from '@ui/separator';
import { Heading } from '@components/heading';
import Link from 'next/link';

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
        badges={['👑 Iconic Idols']}
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
        {/* TEMP */}
        <div className='relative grid aspect-[2/3] h-fit w-[260px] place-items-center rounded-md border'>
          <Link
            href='/celebrities'
            className='z-10 cursor-pointer select-none space-y-1 text-center'
          >
            <h2 className='text-4xl shadow-orange-500 drop-shadow-md'>⭐</h2>
            <p className='transition-all hover:text-orange-500 hover:underline'>
              See more!
            </p>
          </Link>

          <div className='absolute -z-10 h-10 w-10 animate-pulse rounded-full bg-orange-500 blur-xl' />
          <div className='absolute -z-10 h-5 w-5 animate-pulse rounded-full bg-red-600 blur-xl' />
        </div>
      </Carousel>
    </section>
  );
}
