import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { INextPageParams } from '#types/index';
import { getPersonDetails } from '#actions/getPersonDetails';
import { BaseFigure } from '#components/figure/base-figure';
import {
  TitledSection,
  TitledStreamingSection,
} from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { TextSkeleton } from '#components/skeleton/text-skeleton';
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
  const t = await getTranslations('PersonPage');
  if (error) return notFound();

  return (
    <main className='flex flex-col gap-4 sm:flex-row'>
      <section className='flex-[1_1_260px] space-y-6 sm:min-w-[260px]'>
        <BaseFigure
          path={person.profile_path}
          alt='Person Avatar'
          className='aspect-[2/3] h-auto w-full'
          width={260}
          height={390}
        />
        <PersonDetails person={person} />
      </section>
      <div className='grow space-y-6 overflow-hidden'>
        <TitledStreamingSection
          title={t('PersonBiography.title')}
          fallback={<TextSkeleton blocksCount={20} />}
        >
          <PersonBiography personId={person.id} />
        </TitledStreamingSection>

        <TitledStreamingSection
          title={t('KnownFor.title')}
          fallback={<LoadingCarousel aspect='horizontal' />}
        >
          <CombinedCredits personId={person.id} />
        </TitledStreamingSection>

        <TitledSection title={t('AlsoKnownFor.title')}>
          <PersonKnownAs person={person} />
        </TitledSection>
      </div>
    </main>
  );
}
