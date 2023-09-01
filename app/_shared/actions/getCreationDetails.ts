import type { IMovieDetails } from '@app/types/movies-types';
import type { ITVDetails } from '@app/types/tv-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export function getCreationDetails<T extends MediaType>(
  creationId: number,
  mediaType: T,
  params?: BaseParams
) {
  return $api.get<T extends MediaType.Movie ? IMovieDetails : ITVDetails>(
    `/3/${mediaType}/${creationId}`,
    {
      params,
    }
  );
}
