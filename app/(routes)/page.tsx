import { Separator } from '@ui/separator';
import { getTrending } from '@actions/getTrending';
import { Sort, getMovies } from '@actions/getMovies';
import { getCelebrities } from '@/app/_shared/actions/getCelebrities';
import { CreationArticle } from '@components/article/creation-article';
import { PersonArticle } from '@components/article/person-article';
import { Carousel } from '@components/carousel';

export default async function Home() {
  // TEMP
  const { data: creations } = await getTrending({});
  const { data: celebrities } = await getCelebrities({});
  const { data: upcoming } = await getMovies(Sort.Upcoming);
  if (!creations || !celebrities || !upcoming) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Trands now</h2>
          <p className='text-sm text-muted-foreground'>
            This week&apos;s top TV and movies.
          </p>
        </div>
      </div>
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

      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Popular</h2>
          <p className='text-sm text-muted-foreground'>
            The most viewed TV and movies.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <Carousel>
        {creations.results.map((creation) => (
          <CreationArticle
            aspect='horizontal'
            key={creation.id}
            creation={creation}
            className='w-[260px]'
            size='sm'
            width={260}
            height={140}
          />
        ))}
      </Carousel>

      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Upcoming!</h2>
          <p className='text-sm text-muted-foreground'>
            Novelties that may be interesting
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <Carousel>
        {upcoming.results.map((creation) => (
          <CreationArticle
            aspect='horizontal'
            key={creation.id}
            creation={creation}
            className='w-[260px]'
            size='sm'
            width={260}
            height={140}
          />
        ))}
      </Carousel>

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
    </main>
  );
}
