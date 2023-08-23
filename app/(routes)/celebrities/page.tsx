import { PersonArticle } from '@components/article/person-article';
import { getCelebrities } from '@actions/getCelebrities';

export default async function CelebritiesPage() {
  const { data: celebrities } = await getCelebrities();

  // TEMP
  if (!celebrities) return null;

  return (
    <main className='flex flex-wrap gap-4'>
      {celebrities.results.map((celebrity) => (
        <PersonArticle
          key={celebrity.id}
          celebrity={celebrity}
          className='mb-4 w-[40%] md:w-[260px] flex-grow'
        />
      ))}
    </main>
  );
}
