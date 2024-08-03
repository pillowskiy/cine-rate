import { getTranslations } from 'next-intl/server';
import { INextPageParams } from '#types/index';
import { getAggregateCredits } from '#actions/getAggregateCredits';
import { TitledSection } from '#components/section/titled';
import { pipeSlugId } from '#libs/tmdb/slugify';
import SeriesCast from './series-cast';
import SeriesCrew from './series-crew';

export default async function SeriesCastPage({ params }: INextPageParams) {
  const seriesId = pipeSlugId(params.slug);
  const t = await getTranslations('Creations.CreationCredits');
  const aggregateCredits = await getAggregateCredits(seriesId);

  return (
    <main className='flex flex-wrap gap-4'>
      <TitledSection
        className='flex-1'
        title={t('CreationCast.title', {
          creditsCount: aggregateCredits.cast.length,
        })}
      >
        <SeriesCast cast={aggregateCredits.cast} />
      </TitledSection>
      <TitledSection
        className='flex-1'
        title={t('CreationCrew.title', {
          creditsCount: aggregateCredits.crew.length,
        })}
      >
        <SeriesCrew crew={aggregateCredits.crew} />
      </TitledSection>
    </main>
  );
}
