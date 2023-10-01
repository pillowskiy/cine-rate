import type { CreationIdentifierProps } from './common/types';
import { CreditArticle } from '@components/article/credit-article';
import { Carousel } from '@components/carousel';
import { MSeparator } from '@ui/separator';
import { getCreationCredits } from '@actions/getCreationCredits';
import { Heading } from '@components/heading';
import { NotFound } from '@components/not-found';

export default async function CreationCast({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const { data: credits } = await getCreationCredits(
    creationId,
    mediaType
  ).catch(() => ({ data: null }));

  return (
    <section>
      <Heading title='Cast' description='The creation cast.' />
      <MSeparator className='my-4' />
      <Carousel>
        {credits?.cast.length ? (
          credits.cast
            .slice(0, 10)
            .map((credit, i) => (
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
    </section>
  );
}
