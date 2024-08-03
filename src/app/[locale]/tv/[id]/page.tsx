import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { INextPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { MediaType } from '#config/enums';
import CreationPartialCast from '#components/creation/creation-credits/creation-partial-cast';
import CreationHeader from '#components/creation/creation-header';
import CreationMediaTabs from '#components/creation/creation-media-tabs';
import CreationOverview from '#components/creation/creation-overview';
import CreationSimilar from '#components/creation/creation-similar';
import { TitledStreamingSection } from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { generateCreationMetadata } from '#libs/common/metadata';
import { pipe } from '#libs/common/next';
import { getCreationTitle } from '#libs/tmdb';
import SeriesDetails from './series-details';
import SeriesSeasons from './series-seasons';

const CreationReviews = dynamic(
  () => import('#components/creation/creation-reviews'),
  { ssr: false }
);

export const generateMetadata = generateCreationMetadata(MediaType.TV);

export default async function TVPage({ params }: INextPageParams) {
  const t = await getTranslations('Creations');
  const paramId = pipe.strToInt(params?.id);
  const [tv, error] = await getCreationDetails(paramId, MediaType.TV);

  if (error) return notFound();

  return (
    <main className='grid min-h-screen w-full grid-cols-1 gap-6 md:grid-cols-[1fr,260px]'>
      <CreationHeader details={tv} mediaType={MediaType.TV} />
      <div className='grow space-y-6 overflow-hidden'>
        <CreationOverview details={tv} />
        <TitledStreamingSection
          title={t('CreationCast.title')}
          subTitle={t('CreationCast.description', {
            title: getCreationTitle(tv),
          })}
          fallback={<LoadingCarousel />}
        >
          <CreationPartialCast creationId={tv.id} mediaType={MediaType.TV} />
        </TitledStreamingSection>

        {tv.seasons.length && <SeriesSeasons details={tv} />}

        <TitledStreamingSection
          title={t('CreationMediaTabs.title')}
          subTitle={t('CreationMediaTabs.description')}
          fallback={<LoadingCarousel withText={false} />}
        >
          <CreationMediaTabs mediaType={MediaType.TV} creationId={tv.id} />
        </TitledStreamingSection>

        <TitledStreamingSection
          title={t('CreationSimilar.title')}
          subTitle={t('CreationSimilar.description', {
            title: getCreationTitle(tv),
          })}
          fallback={<LoadingCarousel aspect='horizontal' />}
        >
          <CreationSimilar creationId={tv.id} mediaType={MediaType.TV} />
        </TitledStreamingSection>

        <CreationReviews creationId={tv.id} mediaType={MediaType.TV} />
      </div>
      <SeriesDetails
        className='w-full min-w-[] space-y-6 sm:w-[260px]'
        details={tv}
      />
    </main>
  );
}
