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
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={tv} mediaType={MediaType.TV} />
      <section className='flex flex-col gap-4 md:flex-row'>
        <div className='grow space-y-6 overflow-hidden'>
          <CreationOverview details={tv} />
          <CreationCast creationId={tv.id} mediaType={MediaType.TV} />
          {tv.seasons.length && <SerriesSeasons details={tv} />}
          <CreationMediaTabs creationId={tv.id} mediaType={MediaType.TV} />
          <CreationSimilar creationId={tv.id} mediaType={MediaType.TV} />
          <CreationReviews creationId={tv.id} mediaType={MediaType.TV} />
        </div>
        <SeriesDetails
          className='w-full min-w-[260px] space-y-6 sm:w-[260px]'
          details={tv}
        />
      </section>
    </main>
  );
}
