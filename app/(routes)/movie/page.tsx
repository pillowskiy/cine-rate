import { MediaType, MovieSort } from '@config/enums';

import {
  CreationCatalog,
  CreationCatalogHeader,
} from '@components/creation/creation-catalog';

export default async function MoviesPage() {
  return (
    <main className='space-y-6'>
      <CreationCatalogHeader mediaType={MediaType.Movie} Sort={MovieSort} />
      <CreationCatalog mediaType={MediaType.Movie} />
    </main>
  );
}
