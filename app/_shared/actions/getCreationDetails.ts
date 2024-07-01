import type { BaseParams } from '@app/types/index';
import type { IMovieDetails } from '@app/types/movies-types';
import type { ITVDetails } from '@app/types/tv-types';

import type { MediaType } from '@config/enums';

import { $api } from '@api/api-interceptor';

type CreationDetails<T extends MediaType> = T extends MediaType.Movie
  ? IMovieDetails
  : ITVDetails;

export function getCreationDetails<T extends MediaType>(
  creationId: number,
  mediaType: T,
  params?: BaseParams
) {
  return $api.safeFetch<CreationDetails<T>>(`/${mediaType}/${creationId}`, {
    params: {
      ...params,
      append_to_response: 'external_ids',
    },
    cache: 'force-cache',
  });
}
