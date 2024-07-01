import { notFound } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { MediaType } from '#config/enums';
import { pipe } from '#libs/common/next';
import EpisodeFilter from './episode-filter';
import EpisodeHeader from './episode-header';
import EpisodeList from './episode-list';

export default async function EpisodesPage({
  params,
  searchParams,
}: INextPageParams) {
  const seriesId = pipe.strToInt(params?.id);
  const seasonNumber = parseInt(searchParams?.season || '1');
  const sort = searchParams?.sort;

  const [series, error] = await getCreationDetails(seriesId, MediaType.TV);

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <EpisodeHeader series={series} />
      <EpisodeFilter series={series} />
      <EpisodeList
        seriesId={seriesId}
        seasonNumber={seasonNumber}
        sort={sort}
      />
    </main>
  );
}
