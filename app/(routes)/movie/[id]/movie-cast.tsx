import { MediaType } from '@app/types/index';
import { CreditArticle } from '@components/article/credit-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { getCreationCredits } from '@/app/_shared/actions/getCreationCredits';

interface MovieCastProps {
  creationId: number;
}

export default async function MovieCast({ creationId }: MovieCastProps) {
  const { data: credits } = await getCreationCredits(creationId, MediaType.Movie);

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
            className='w-[260px]'
            key={credit.id}
            credit={credit}
          />
        ))}
      </Carousel>
    </section>
  );
}
