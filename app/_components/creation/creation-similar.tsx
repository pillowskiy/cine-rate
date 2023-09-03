import type { CreationIdentifierProps } from './common/types';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { getSimilar } from '@actions/getSimilar';

export default async function CreationSimilar({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const { data: creations } = await getSimilar(creationId, mediaType);

  if (!creations) return null;

  return (
    <section>
      <div className='mt-6 flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Similar</h2>
          <p className='text-sm text-muted-foreground'>More like this.</p>
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
            width={720}
            height={480}
          />
        ))}
      </Carousel>
    </section>
  );
}
