import { getSimilar } from '#actions/getSimilar';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import type { CreationIdentifierProps } from './common/types';

export default async function CreationSimilar({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const [creations, error] = await getSimilar(creationId, mediaType);

  if (error) return null;

  return (
    <Carousel>
      {!!creations?.results.length ? (
        creations.results.map((creation, i) => (
          <CreationArticle
            custom={i}
            defaultMediaType={mediaType}
            aspect='horizontal'
            key={creation.id}
            creation={creation}
          />
        ))
      ) : (
        <NotFound />
      )}
    </Carousel>
  );
}
