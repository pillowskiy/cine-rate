import { BaseFigure } from '@components/figure/base-figure';
import { getPersonDetails } from '@actions/getPersonDetails';
import PersonBiography from './person-biography';
import CombinedCredits from './combined-credits';

interface PersonPageProps {
  params: { id?: string | undefined };
}

export default async function PersonPage({ params }: PersonPageProps) {
  if (!params.id || isNaN(+params.id)) return null;
  const { data: person } = await getPersonDetails(+params.id);

  if (!person) return null;

  return (
    <main className='my-4 flex flex-col gap-4 sm:flex-row'>
      <section className='flex-[1 1 260px] space-y-6 sm:sticky sm:min-w-[260px]'>
        <BaseFigure
          posterPath={person.profile_path}
          alt='Person Avatar'
          className='w-full'
          width={260}
          height={420}
        />
        <div className='flex flex-wrap gap-1.5 text-xs sm:text-sm'>
          {person.also_known_as.map((known) => (
            <div key={known} className='opacty-70 rounded-md border p-1'>
              {known}
            </div>
          ))}
        </div>
      </section>
      <section className='flex-grow overflow-hidden space-y-6'>
        <h1 className='mb-4 truncate text-3xl font-medium'>{person.name}</h1>
        <PersonBiography personId={person.id} />
        <CombinedCredits personId={person.id} />
      </section>
    </main>
  );
}
