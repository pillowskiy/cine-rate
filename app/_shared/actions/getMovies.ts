import type { BaseParams } from '@app/types/index';
import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

export enum Sort {
  Popular = 'popular',
  NowPlaying = 'now_playing',
  TopRated = 'top_rated',
  Upcoming = 'upcoming',
}

export function getMovies(sort: Sort = Sort.Popular, params?: BaseParams) {
  return $api.get<CreationsResponse>(`/3/movie/${sort}`, { params });
}
