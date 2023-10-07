import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import type { GenresResponse } from '@app/types/genre-types';
import { $api } from '@api/api-interceptor';

export function getGenres(mediaType: MediaType, params?: BaseParams) {
  return $api.safeFetch<GenresResponse>(`/3/genre/${mediaType}/list`, { params });
}
