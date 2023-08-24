import type { BaseParams, MediaType } from '@app/types/index';
import type { GenresResponse } from '@app/types/genre-types';
import { $api } from '../api/api-interceptor';

export function getGenres(mediaType: MediaType, params?: BaseParams) {
  return $api.get<GenresResponse>(`/3/genre/${mediaType}/list`, { params });
}
