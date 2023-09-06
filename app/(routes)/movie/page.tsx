import { CreationArticle } from '@components/article/creation-article';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';
import { Filter } from 'lucide-react';

import { getDiscover } from '@actions/getDiscover';
import { Sort } from '@actions/getMovies';
import { MediaType } from '@app/types/index';
import { getGenres } from '@actions/getGenres';
import { CreationFilterDialog } from '@components/dialog/creation-filter-dialog';
import { CreationSortSelect } from '@components/select/creation-sort-select';

export default async function MoviesPage() {
  const { data: movies } = await getDiscover(MediaType.Movie);
  const { data: genreList } = await getGenres(MediaType.Movie);
  // TEMP
  if (!movies || !genreList.genres.length) return null;

  return (
    <main className='space-y-6'>
      <header className='flex justify-between gap-4 overflow-hidden py-2'>
        <div className='flex gap-2 flex-wrap'>
          <CreationFilterDialog mediaType={MediaType.Movie}>
            <Button size='icon' variant='outline' title='Filter'>
              <Filter className='h-5 w-5' />
            </Button>
          </CreationFilterDialog>

          <CreationSortSelect Sort={Sort} />

          <Select defaultValue='all'>
            <SelectTrigger className='w-[120px] sm:w-[180px]'>
              <SelectValue placeholder='Show me' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='watched'>Watched Movies</SelectItem>
                <SelectItem value='unwatched'>Unwatched Movies</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>
      <section className='flex flex-wrap gap-4'>
        {movies.results.map((movie) => (
          <CreationArticle
            key={movie.id}
            creation={movie}
            className='mb-4 w-[40%] flex-grow md:w-[260px]'
            width={260}
            height={390}
          />
        ))}
      </section>
    </main>
  );
}
