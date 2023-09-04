import type { CreationIdentifierProps } from './common/types';
import { CreditArticle } from '@components/article/credit-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { getCreationCredits } from '@actions/getCreationCredits';

export default async function CreationCast({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const { data: credits } = await getCreationCredits(creationId, mediaType);

  // TEMP
  if (!credits) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Cast</h2>
          <p className='text-sm text-muted-foreground'>The creation cast.</p>
        </div>
      </div>
      <Separator className='my-4' />
      <Carousel>
        {credits.cast.slice(0, 10).map((credit) => (
          <CreditArticle
            className='w-[120px] sm:w-[260px]'
            key={credit.id}
            credit={credit}
          />
        ))}
      </Carousel>
    </section>
  );
}
