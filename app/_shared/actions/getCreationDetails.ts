import type { IMovieDetails } from '@app/types/movies-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export const getCreationDetails = (
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) => {
  return $api.get<IMovieDetails>(`/3/${mediaType}/${creationId}`, {
    params,
  });
};
