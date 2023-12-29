import type { BaseParams } from '@app/types/index';
import type { CreationsResponse } from '@app/types/creation-types';
import type { MovieSort } from '@config/enums';
import { $api } from '@api/api-interceptor';

export function getMovies(sort: MovieSort, params?: BaseParams) {
  return $api.safeFetch<CreationsResponse>(`/movie/${sort}`, { params });
}
