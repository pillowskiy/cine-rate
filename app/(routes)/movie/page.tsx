import CreationCatalog from '@components/creation/creation-catalog';
import CreationCatalogHeader from '@components/creation/creation-catalog-header';
import { MediaType, MovieSort } from '@config/enums';

export default async function MoviesPage() {
  return (
    <main className='space-y-6'>
      <CreationCatalogHeader mediaType={MediaType.Movie} Sort={MovieSort} />
      <CreationCatalog mediaType={MediaType.Movie} />
    </main>
  );
}
