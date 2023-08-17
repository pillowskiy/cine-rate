import type { CreditsResponse } from '@app/types/celebrity-types';
import { $api } from '../api/api-interceptor';

interface GetCreditsOptions {
  language?: string;
}

export const getMovieCredits = (
  movieId: number,
  { language = 'es-US' }: GetCreditsOptions
) => {
  return $api.get<CreditsResponse>(`/3/movie/${movieId}/credits`, {
    params: { language },
  });
};
