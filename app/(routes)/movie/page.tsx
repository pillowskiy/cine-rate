import CreationCatalog from '@components/creation/creation-catalog';
import CreationCatalogHeader from '@components/creation/creation-catalog-header';
import { MediaType } from '@app/types/index';
import { Sort } from '@actions/getMovies';

export default async function MoviesPage() {
  return (
    <main className='space-y-6'>
      <CreationCatalogHeader mediaType={MediaType.Movie} Sort={Sort} />
      <CreationCatalog mediaType={MediaType.Movie} />
    </main>
  );
}
