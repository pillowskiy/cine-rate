import type { BaseParams } from '#types/index';
import type { IMovieDetails } from '#types/movies-types';
import type { ITVDetails } from '#types/tv-types';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

type CreationDetails<T extends MediaType> = T extends MediaType.Movie
  ? IMovieDetails
  : ITVDetails;

export function getCreationDetails<T extends MediaType>(
  creationId: number,
  mediaType: T,
  params: BaseParams = {}
) {
  return $api.safeFetch<CreationDetails<T>>(`/${mediaType}/${creationId}`, {
    params: {
      ...params,
      append_to_response: 'external_ids',
    },
    ...dayCacheTerm,
  });
}
