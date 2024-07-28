import { useTranslations } from 'next-intl';
import { BaseFigure } from '#components/figure/base-figure';
import { TitledSection } from '#components/section/titled';
import type { CreationDetailsProps } from './common/types';
import { getTitle } from './common/utils';
import { CreationGenres } from './creation-genres';

export default function CreationOverview({ details }: CreationDetailsProps) {
  const t = useTranslations('Creations.CreationOverview');

  return (
    <TitledSection
      title={t('title')}
      subTitle={
        details.tagline || t('description', { title: getTitle(details) })
      }
    >
      <div className='flex space-x-4 sm:space-x-0'>
        <BaseFigure
          className='block aspect-[2/3] h-fit w-[120px] min-w-[120px] sm:hidden'
          path={details.poster_path}
          width={120}
          height={180}
          quality={100}
        />
        <div className='grow space-y-2 overflow-hidden'>
          <CreationGenres
            className='w-full sm:hidden'
            genres={details.genres.slice(0, 3)}
          />
          <p className='grow break-words text-sm md:text-base'>
            {details.overview || 'No overview found.'}
          </p>
        </div>
      </div>
    </TitledSection>
  );
}
