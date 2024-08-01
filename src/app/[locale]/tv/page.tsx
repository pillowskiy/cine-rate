import { MediaType } from '#config/enums';
import {
  CreationCatalog,
  CreationCatalogHeader,
} from '#components/creation/creation-catalog';

export default async function TVPage() {
  return (
    <main className='space-y-6'>
      <CreationCatalogHeader mediaType={MediaType.TV} />
      <CreationCatalog mediaType={MediaType.TV} />
    </main>
  );
}
