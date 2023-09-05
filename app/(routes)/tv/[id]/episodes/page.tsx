import { getCreationDetails } from '@actions/getCreationDetails';
import { MediaType, type INextPageParams } from '@app/types/index';
import { intParamPipe } from '@libs/common/next';
import EpisodeFilter from './episode-filter';
import EpisodeList from './episode-list';
import EpisodeHeader from './episode-header';

export default async function EpisodesPage({
  params,
  searchParams,
}: INextPageParams) {
  const seriesId = intParamPipe('id', params);
  const seasonNumber = parseInt(searchParams?.season || '1');
  const { data: series } = await getCreationDetails(seriesId, MediaType.TV);

  // TEMP
  if (!series) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      <EpisodeHeader series={series} />
      <EpisodeFilter series={series} />
      <EpisodeList seriesId={seriesId} seasonNumber={seasonNumber} />
    </main>
  );
}
