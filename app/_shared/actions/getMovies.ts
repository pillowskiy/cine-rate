import type { BaseParams } from '@app/types/index';
import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';
import { MovieSort } from '@config/enums';

export function getMovies(sort: MovieSort, params?: BaseParams) {
  return $api.get<CreationsResponse>(`/3/movie/${sort}`, { params });
}
