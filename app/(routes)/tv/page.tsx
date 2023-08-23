import { CreationArticle } from '@/app/_components/article/creation-article';
import { Sort, getTV } from '@/app/_shared/actions/getTV';

export default async function TVPage() {
  // TEMP: sort method to query params
  const { data: tv } = await getTV(Sort.Popular);

  // TEMP
  if (!tv) return null;

  return (
    <main className='flex flex-wrap gap-4'>
      {tv.results.map((series) => (
        <CreationArticle
          key={series.id}
          creation={series}
          className='mb-4 w-[40%] md:w-[260px] flex-grow'
          width={260}
          height={390}
        />
      ))}
    </main>
  );
}
