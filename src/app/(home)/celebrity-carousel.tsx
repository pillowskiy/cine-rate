import Link from 'next/link';
import { getPopular } from '#actions/getPopular';
import { MediaType } from '#config/enums';
import { MSeparator } from '#ui/separator';
import { PersonArticle } from '#components/article/person-article';
import { Carousel } from '#components/carousel';
import { Heading } from '#components/heading';
import { NotFound } from '#components/not-found';

export default async function CelebrityCarousel() {
  const [celebrities, error] = await getPopular(MediaType.Person);

  if (error) return null;

  return (
    <section>
      <Heading
        title='Celebrities'
        description='The most popular celebrities.'
        badges={['👑 Iconic Idols']}
      />
      <MSeparator className='my-4' />
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
          {/* TEMP */}
          <div className='relative grid aspect-[2/3] h-fit w-[160px] place-items-center rounded-md border sm:w-[260px]'>
            <Link
              href='/celebrities'
              className='z-10 cursor-pointer select-none space-y-1 text-center'
            >
              <h2 className='text-4xl shadow-orange-500 drop-shadow-md'>⭐</h2>
              <p className='transition-all hover:text-orange-500 hover:underline'>
                See more!
              </p>
            </Link>

            <div className='absolute -z-10 size-10 animate-pulse rounded-full bg-orange-500 blur-xl' />
            <div className='absolute -z-10 size-5 animate-pulse rounded-full bg-red-600 blur-xl' />
          </div>
        </Carousel>
      ) : (
        <NotFound />
      )}
    </section>
  );
}
