import { notFound } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { getPersonDetails } from '#actions/getPersonDetails';
import { BaseFigure } from '#components/figure/base-figure';
import { generatePersonMetadata } from '#libs/common/metadata';
import { pipe } from '#libs/common/next';
import CombinedCredits from './combined-credits';
import PersonBiography from './person-biography';
import PersonDetails from './person-details';
import PersonKnownAs from './person-known-as';

export const generateMetadata = generatePersonMetadata();

export default async function PersonPage({ params }: INextPageParams) {
  const personId = pipe.strToInt(params?.id);
  const [person, error] = await getPersonDetails(personId);

  if (error) return notFound();

  return (
    <main className='flex flex-col gap-4 sm:flex-row'>
      <section className='flex-[1 1 260px] space-y-6 sm:min-w-[260px]'>
        <BaseFigure
          path={person.profile_path}
          alt='Person Avatar'
          className='aspect-[2/3] h-auto w-full'
          width={260}
          height={390}
        />
        <PersonDetails person={person} />
      </section>
      <section className='grow space-y-6 overflow-hidden'>
        <h1 className='mb-4 truncate text-3xl font-medium'>{person.name}</h1>
        <PersonBiography personId={person.id} />
        <CombinedCredits personId={person.id} />
        <PersonKnownAs person={person} />
      </section>
    </main>
  );
}
