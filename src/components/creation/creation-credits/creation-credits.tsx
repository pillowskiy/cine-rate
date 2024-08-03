import { useTranslations } from 'next-intl';
import { getCreationCredits } from '#actions/getCreationCredits';
import { TitledSection } from '#components/section/titled';
import { CreationIdentifierProps } from '../common/types';
import CreationCast from './creation-cast';
import CreationCrew from './creation-crew';

export default async function CreationCredits({
  mediaType,
  creationId,
}: CreationIdentifierProps) {
  const t = useTranslations('Creations.CreationCredits');

  const credits = await getCreationCredits(creationId, mediaType).catch(
    () => null
  );

  if (!credits) return null;

  return (
    <main className='flex flex-wrap gap-4'>
      <TitledSection
        className='flex-1'
        title={t('CreationCast.title', { creditsCount: credits.cast.length })}
      >
        <CreationCast cast={credits.cast} />
      </TitledSection>
      <TitledSection
        className='flex-1'
        title={t('CreationCrew.title', { creditsCount: credits.crew.length })}
      >
        <CreationCrew crew={credits.crew} />
      </TitledSection>
    </main>
  );
}
