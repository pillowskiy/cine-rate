import { getSimilar } from '#actions/getSimilar';
import { MSeparator } from '#ui/separator';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { Heading } from '#components/heading';
import { NotFound } from '#components/not-found';
import type { CreationIdentifierProps } from './common/types';

export default async function CreationSimilar({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const [creations, error] = await getSimilar(creationId, mediaType);

  if (error) return null;

  return (
    <section>
      <Heading title='Similar' description='More like this.' />
      <MSeparator className='my-4' />
      <Carousel>
        {!!creations?.results.length ? (
          creations.results.map((creation, i) => (
            <CreationArticle
              custom={i}
              defaultMediaType={mediaType}
              aspect='horizontal'
              key={creation.id}
              creation={creation}
              className='w-[260px]'
              size='sm'
              width={260}
              height={140}
            />
          ))
        ) : (
          <NotFound />
        )}
      </Carousel>
    </section>
  );
}
