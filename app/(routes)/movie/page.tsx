import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';

import { CreationFilterDialog } from '@components/dialog/creation-filter-dialog';
import { CreationSortSelect } from '@components/select/creation-sort-select';
import CreationCatalog from '@components/creation/creation-catalog';

import { Filter } from 'lucide-react';

import { Sort } from '@actions/getMovies';
import { MediaType } from '@app/types/index';
import { getGenres } from '@actions/getGenres';

export default async function MoviesPage() {
  const { data: genreList } = await getGenres(MediaType.Movie);
  // TEMP
  if (!genreList.genres.length) return null;

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
      <CreationCatalog className='flex-wrap' mediaType={MediaType.Movie} />
    </main>
  );
}
