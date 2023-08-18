import { CreditArticle } from '@components/article/credit-article';
import { ScrollBar, ScrollArea } from '@ui/scroll-area';
import { Separator } from '@ui/separator';
import type { IMovieDetails } from '@app/types/movies-types';
import { getMovieCredits } from '@actions/getMovieCredits';

interface MovieCastProps {
  movie: IMovieDetails;
}

export async function MovieCast({ movie }: MovieCastProps) {
  const { data: credits } = await getMovieCredits(movie.id, {});

  if (!credits) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Cast</h2>
          <p className='text-sm text-muted-foreground'>
            The movie cast.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <ScrollArea>
        <section className='flex snap-x space-x-4 pb-4'>
          {credits.cast.slice(0, 10).map((credit) => (
            <CreditArticle
              className='w-[260px]'
              key={credit.id}
              credit={credit}
            />
          ))}
        </section>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
