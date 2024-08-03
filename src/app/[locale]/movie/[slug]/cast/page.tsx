import { INextPageParams } from '#types/index';
import { MediaType } from '#config/enums';
import CreationCredits from '#components/creation/creation-credits/creation-credits';
import { pipeSlugId } from '#libs/tmdb/slugify';

export default async function MovieCastPage({ params }: INextPageParams) {
  const movieId = pipeSlugId(params.slug);

  return <CreationCredits mediaType={MediaType.Movie} creationId={movieId} />;
}
