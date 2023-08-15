import type { IMovieDetails } from '@app/types/movies-types';
import { $api } from '../api/api-interceptor';

interface GetUpcomingOptions {
  language?: string;
}

export const getMovieDetails = (
  id: number,
  { language = 'en-US' }: GetUpcomingOptions
) => {
  return $api.get<IMovieDetails>(`/3/movie/${id}`, { params: { language } });
};
