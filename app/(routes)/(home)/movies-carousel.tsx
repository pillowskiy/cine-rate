import { Separator } from '@ui/separator';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Sort, getMovies } from '@actions/getMovies';

// TEMP: to tabs with sorting
export default async function MoviesCarousel() {
  const { data: upcoming } = await getMovies(Sort.Upcoming).catch(() => ({
    data: null,
  }));

  // TEMP
  if (!upcoming) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Upcoming!</h2>
          <p className='text-sm text-muted-foreground'>
            Novelties that may be interesting.
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
    </section>
  );
}
