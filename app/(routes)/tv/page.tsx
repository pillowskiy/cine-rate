import { MediaType, TVSort } from '@config/enums';
import {
  CreationCatalog,
  CreationCatalogHeader,
} from '@components/creation/creation-catalog';

export default async function TVPage() {
  return (
    <main className='flex flex-wrap gap-4'>
      <main className='space-y-6'>
        <CreationCatalogHeader mediaType={MediaType.TV} Sort={TVSort} />
        <CreationCatalog className='flex-wrap' mediaType={MediaType.TV} />
      </main>
    </main>
  );
}
