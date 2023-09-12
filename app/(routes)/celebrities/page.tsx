import { CelebrityCatalog } from './celebrity-catalog';

export default async function CelebritiesPage() {
  return (
    <main className='flex flex-wrap gap-4'>
      <CelebrityCatalog />
    </main>
  );
}
