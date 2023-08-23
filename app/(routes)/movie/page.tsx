import { CreationArticle } from '@/app/_components/article/creation-article';
import { Sort, getMovies } from '@/app/_shared/actions/getMovies';

export default async function MoviesPage() {
  // TEMP: sort method to query params
  const { data: movies } = await getMovies(Sort.Popular);

  // TEMP
  if (!movies) return null;

  return (
    <main className='flex flex-wrap gap-4'>
      {movies.results.map((movie) => (
        <CreationArticle
          key={movie.id}
          creation={movie}
          className='mb-4 w-[40%] md:w-[260px] flex-grow'
          width={260}
          height={390}
        />
      ))}
    </main>
  );
}
