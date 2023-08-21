import { getCreationDetails } from '@actions/getCreationDetails';
import MovieCast from './movie-cast';
import SimilarCreations from './similar-creations';
import MediaTabs from './media-tabs';
import { MediaType } from '@app/types/index';
import MovieHeader from './movie-header';
import MovieOverview from './movie-overview';
import CreationReviews from './creation-reviews';

interface MoviePageProps {
  params: { id?: string | undefined };
}

export default async function MoviePage({ params }: MoviePageProps) {
  if (!params.id || isNaN(+params.id)) return null;
  const { data: movie } = await getCreationDetails(+params.id, MediaType.Movie);

  // TEMP
  if (!movie) return null;

  return (
    <div className='min-h-screen w-full space-y-6'>
      <MovieHeader movie={movie} />
      <MovieOverview movie={movie} />
      <MovieCast creationId={movie.id} />
      <MediaTabs creationId={movie.id} />
      <SimilarCreations movieId={movie.id} />
      <CreationReviews creationId={movie.id} />
    </div>
  );
}
