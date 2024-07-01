import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MovieSort } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getMovies(sort: MovieSort, params?: BaseParams) {
  return $api.safeFetch<CreationsResponse>(`/movie/${sort}`, { params });
}
