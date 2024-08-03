import { INextPageParams } from '#types/index';
import { MediaType } from '#config/enums';
import CreationCredits from '#components/creation/creation-credits/creation-credits';
import { pipe } from '#libs/common/next';

export default async function MovieCastPage({ params }: INextPageParams) {
  const movieId = pipe.strToInt(params.id);

  return <CreationCredits mediaType={MediaType.Movie} creationId={movieId} />;
}
