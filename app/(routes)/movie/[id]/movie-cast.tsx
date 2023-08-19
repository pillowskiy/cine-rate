import { CreditArticle } from '@components/article/credit-article';
import { Carousel } from '@components/carousel';
import type { IMovieDetails } from '@app/types/movies-types';
import { getMovieCredits } from '@actions/getMovieCredits';

interface MovieCastProps {
  movie: IMovieDetails;
}

export async function MovieCast({ movie }: MovieCastProps) {
  const { data: credits } = await getMovieCredits(movie.id, {});

  if (!credits) return null;

  return (
    <Carousel>
      {credits.cast.slice(0, 10).map((credit) => (
        <CreditArticle className='w-[260px]' key={credit.id} credit={credit} />
      ))}
    </Carousel>
  );
}
