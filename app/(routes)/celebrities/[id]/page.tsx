import { BaseFigure } from '@components/figure/base-figure';
import PersonBiography from './person-biography';
import CombinedCredits from './combined-credits';
import PersonKnownAs from './person-known-as';
import PersonDetails from './person-details';

import { getPersonDetails } from '@actions/getPersonDetails';
import { intParamPipe } from '@libs/common/next';

interface PersonPageProps {
  params: { id?: string | undefined };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const personId = intParamPipe('id', params);
  const { data: person } = await getPersonDetails(personId);

  // TEMP;
  if (!person) return null;

  return (
    <main className='flex flex-col gap-4 sm:flex-row'>
      <section className='flex-[1 1 260px] space-y-6 sm:min-w-[260px]'>
        <BaseFigure
          posterPath={person.profile_path}
          alt='Person Avatar'
          className='w-full'
          width={260}
          height={420}
        />
        <PersonDetails person={person} />
      </section>
      <section className='flex-grow space-y-6 overflow-hidden'>
        <h1 className='mb-4 truncate text-3xl font-medium'>{person.name}</h1>
        <PersonBiography personId={person.id} />
        <CombinedCredits personId={person.id} />
        <PersonKnownAs person={person} />
      </section>
    </main>
  );
}
