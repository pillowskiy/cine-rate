import { getCelebrities } from '@actions/getCelebrities';
import { CelebrityCatalog } from './celebrity-catalog';

export default async function CelebritiesPage() {
  const { data: celebrities } = await getCelebrities();

  // TEMP
  if (!celebrities) return null;

  return (
    <main className='flex flex-wrap gap-4'>
      <CelebrityCatalog />
    </main>
  );
}
