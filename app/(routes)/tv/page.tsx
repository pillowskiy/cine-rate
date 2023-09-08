import CreationCatalog from '@/app/_components/creation/creation-catalog';
import CreationCatalogHeader from '@/app/_components/creation/creation-catalog-header';
import { Sort } from '@/app/_shared/actions/getTV';
import { MediaType } from '@/app/_types';

export default async function TVPage() {
  return (
    <main className='flex flex-wrap gap-4'>
      <main className='space-y-6'>
        <CreationCatalogHeader mediaType={MediaType.TV} Sort={Sort} />
        <CreationCatalog className='flex-wrap' mediaType={MediaType.TV} />
      </main>
    </main>
  );
}
