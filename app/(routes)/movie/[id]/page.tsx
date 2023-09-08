import type { INextPageParams } from '@app/types/index';
import { MediaType } from '@app/types/index';

import CreationCast from '@components/creation/creation-cast';
import CreationHeader from '@components/creation/creation-header';
import CreationOverview from '@components/creation/creation-overview';
import CreationSimilar from '@components/creation/creation-similar';
import CreationReviews from '@components/creation/creation-reviews';

import MediaTabs from './media-tabs';
import MovieDetails from './movie-details';

import { getCreationDetails } from '@actions/getCreationDetails';

export default async function MoviePage({ params }: INextPageParams) {
  const paramId = +(params?.id.toString() || NaN);
  if (isNaN(paramId)) return null;
  const { data: movie } = await getCreationDetails(paramId, MediaType.Movie);

  // TEMP
  if (!movie) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={movie} mediaType={MediaType.Movie} />
      <section className='flex flex-col gap-4 md:flex-row'>
        <div className='flex-grow space-y-6 overflow-hidden'>
          <CreationOverview details={movie} />
          <CreationCast creationId={movie.id} mediaType={MediaType.Movie} />
          <MediaTabs creationId={movie.id} />
          <CreationSimilar creationId={movie.id} mediaType={MediaType.Movie} />
        </div>
        <MovieDetails className='min-w-[260px] space-y-6' details={movie} />
      </section>
      <CreationReviews creationId={movie.id} />
    </main>
  );
}
