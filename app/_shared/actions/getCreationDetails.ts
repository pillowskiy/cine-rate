import type { IMovieDetails } from '@app/types/movies-types';
import type { ITVDetails } from '@app/types/tv-types';
import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { $api } from '@api/api-interceptor';

export function getCreationDetails<T extends MediaType>(
  creationId: number,
  mediaType: T,
  params?: BaseParams
) {
  return $api.safeFetch<T extends MediaType.Movie ? IMovieDetails : ITVDetails>(
    `/3/${mediaType}/${creationId}`,
    {
      params,
      cache: 'force-cache',
    }
  );
}
