import { getCreationCredits } from '#actions/getCreationCredits';
import { CreditArticle } from '#components/article/credit-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import type { CreationIdentifierProps } from './common/types';

export default async function CreationCast({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const [credits, error] = await getCreationCredits(creationId, mediaType);

  if (error) return null;

  return (
    <Carousel>
      {credits?.cast.length ? (
        credits.cast.map((credit, i) => (
          <CreditArticle
            custom={i}
            className='w-[120px] lg:w-[260px]'
            key={credit.id}
            credit={credit}
          />
        ))
      ) : (
        <NotFound />
      )}
    </Carousel>
  );
}
