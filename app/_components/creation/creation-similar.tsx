import type { CreationIdentifierProps } from './common/types';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { getSimilar } from '@actions/getSimilar';
import { Heading } from '@components/heading';

export default async function CreationSimilar({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const { data: creations } = await getSimilar(creationId, mediaType).catch(
    () => ({ data: null })
  );

  if (!creations?.results.length) return null;

  return (
    <section>
      <Heading title='Similar' description='>More like this.' />
      <Separator className='my-4' />
      <Carousel>
        {creations.results.map((creation) => (
          <CreationArticle
            defaultMediaType={mediaType}
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
