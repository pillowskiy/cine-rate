import type { CreationIdentifierProps } from './common/types';
import { CreditArticle } from '@components/article/credit-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { getCreationCredits } from '@actions/getCreationCredits';
import { Heading } from '@components/heading';

export default async function CreationCast({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const { data: credits } = await getCreationCredits(creationId, mediaType);

  // TEMP
  if (!credits) return null;

  return (
    <section>
      <Heading title='Cast' description='The creation cast.' />
      <Separator className='my-4' />
      <Carousel>
        {credits.cast.slice(0, 10).map((credit) => (
          <CreditArticle
            className='w-[120px] lg:w-[260px]'
            key={credit.id}
            credit={credit}
          />
        ))}
      </Carousel>
    </section>
  );
}
