import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { MediaType } from '#config/enums';
import CreationCast from '#components/creation/creation-cast';
import CreationHeader from '#components/creation/creation-header';
import CreationMediaTabs from '#components/creation/creation-media-tabs';
import CreationOverview from '#components/creation/creation-overview';
import CreationSimilar from '#components/creation/creation-similar';
import { TitledStreamingSection } from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { generateCreationMetadata } from '#libs/common/metadata';
import { pipe } from '#libs/common/next';
import SeriesDetails from './series-details';
import SerriesSeasons from './series-seasons';

const CreationReviews = dynamic(
  () => import('#components/creation/creation-reviews'),
  { ssr: false }
);

export const generateMetadata = generateCreationMetadata(MediaType.TV);

export default async function TVPage({ params }: INextPageParams) {
  const paramId = pipe.strToInt(params?.id);
  const [tv, error] = await getCreationDetails(paramId, MediaType.TV);

  if (error) return notFound();

  return (
    <main className='grid min-h-screen w-full grid-cols-1 gap-6 md:grid-cols-[1fr,260px]'>
      <CreationHeader details={tv} mediaType={MediaType.TV} />
      <div className='grow space-y-6 overflow-hidden'>
        <CreationOverview details={tv} />
        <TitledStreamingSection
          title='Cast'
          subTitle={`The ${tv.title ?? tv.original_title} cast.`}
          fallback={<LoadingCarousel />}
        >
          <CreationCast creationId={tv.id} mediaType={MediaType.TV} />
        </TitledStreamingSection>

        {tv.seasons.length && <SerriesSeasons details={tv} />}

        <TitledStreamingSection
          title='Media'
          subTitle='The media associated with this show.'
          fallback={<LoadingCarousel withText={false} />}
        >
          <CreationMediaTabs mediaType={MediaType.TV} creationId={tv.id} />
        </TitledStreamingSection>

        <TitledStreamingSection
          title='Similar'
          subTitle={`More like ${tv.title ?? tv.original_title}.`}
          fallback={<LoadingCarousel aspect='horizontal' />}
        >
          <CreationSimilar creationId={tv.id} mediaType={MediaType.TV} />
        </TitledStreamingSection>

        <CreationReviews creationId={tv.id} mediaType={MediaType.TV} />
      </div>
      <SeriesDetails
        className='w-full min-w-[260px] space-y-6 sm:w-[260px]'
        details={tv}
      />
    </main>
  );
}
