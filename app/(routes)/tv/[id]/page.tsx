import { MediaType } from '@config/enums';
import type { INextPageParams } from '@app/types/index';

import CreationCast from '@components/creation/creation-cast';
import CreationHeader from '@components/creation/creation-header';
import CreationSimilar from '@components/creation/creation-similar';
import CreationOverview from '@components/creation/creation-overview';
import CreationMediaTabs from '@components/creation/creation-media-tabs';

import SerriesSeasons from './series-seasons';
import SeriesDetails from './series-details';

import { getCreationDetails } from '@actions/getCreationDetails';
import { pipe } from '@libs/common/next';
import { notFound } from 'next/navigation';

export default async function TVPage({ params }: INextPageParams) {
  const paramId = pipe.strToInt(params?.id);
  const [tv, error] = await getCreationDetails(paramId, MediaType.TV);

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={tv} mediaType={MediaType.TV} />
      <section className='flex flex-col gap-4 md:flex-row'>
        <div className='flex-grow space-y-6 overflow-hidden'>
          <CreationOverview details={tv} />
          <CreationCast creationId={tv.id} mediaType={MediaType.TV} />
          {tv.seasons.length && <SerriesSeasons details={tv} />}
          <CreationMediaTabs creationId={tv.id} mediaType={MediaType.TV} />
          <CreationSimilar creationId={tv.id} mediaType={MediaType.TV} />
        </div>
        <SeriesDetails
          className='w-full min-w-[260px] space-y-6 sm:w-[260px]'
          details={tv}
        />
      </section>
    </main>
  );
}
