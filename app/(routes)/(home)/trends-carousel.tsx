import { getTrending } from '@/app/_shared/actions/getTrending';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';

export default async function TrendsCarousel() {
  const { data: creations } = await getTrending().catch(() => ({ data: null }));

  // TEMP
  if (!creations) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Trends now</h2>
          <p className='text-sm text-muted-foreground'>
            The most popular movies and TV series today.
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
    </section>
  );
}
