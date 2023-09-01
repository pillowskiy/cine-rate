import { getCreationDetails } from '@actions/getCreationDetails';
import MovieCast from './movie-cast';
import CreationSimilar from '@components/creation/creation-similar';
import MediaTabs from './media-tabs';
import { INextPageParams, MediaType } from '@app/types/index';
import CreationHeader from '@/app/_components/creation/creation-header';
import MovieOverview from './movie-overview';
import CreationReviews from './creation-reviews';
import CreationCast from '@components/creation/creation-cast';

export default async function MoviePage({ params }: INextPageParams) {
  const paramId = +(params?.id.toString() || NaN);
  if (isNaN(paramId)) return null;
  const { data: movie } = await getCreationDetails(paramId, MediaType.Movie);

  // TEMP
  if (!movie) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={movie} mediaType={MediaType.Movie} />
      <MovieOverview movie={movie} />
      <CreationCast creationId={movie.id} mediaType={MediaType.Movie} />
      <MediaTabs creationId={movie.id} />
      <CreationSimilar creationId={movie.id} mediaType={MediaType.Movie} />
      <CreationReviews creationId={movie.id} />
    </main>
  );
}
