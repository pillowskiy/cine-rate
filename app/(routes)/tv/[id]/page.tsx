import CreationCast from '@components/creation/creation-cast';
import CreationHeader from '@components/creation/creation-header';
import CreationSimilar from '@components/creation/creation-similar';
import CreationOverview from '@components/creation/creation-overview';
import { getCreationDetails } from '@actions/getCreationDetails';
import { MediaType, type INextPageParams } from '@app/types/index';
import SerriesSeasons from './series-seasons';

export default async function TVPage({ params }: INextPageParams) {
  const paramId = +(params?.id.toString() || NaN);
  if (isNaN(paramId)) return null;
  const { data: tv } = await getCreationDetails(paramId, MediaType.TV);

  // TEMP
  if (!tv) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={tv} mediaType={MediaType.TV} />
      <CreationOverview details={tv} />
      <CreationCast creationId={tv.id} mediaType={MediaType.TV} />
      {tv.seasons.length && <SerriesSeasons details={tv} />}
      <CreationSimilar creationId={tv.id} mediaType={MediaType.TV} />
    </main>
  );
}
