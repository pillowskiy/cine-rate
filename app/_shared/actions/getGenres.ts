import type { GenresResponse } from '@app/types/genre-types';
import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { $api } from '@api/api-interceptor';

export function getGenres(mediaType: MediaType, params?: BaseParams) {
  return $api.safeFetch<GenresResponse>(`/genre/${mediaType}/list`, { params });
}
