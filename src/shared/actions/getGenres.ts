import type { GenresResponse } from '#types/genre-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getGenres(mediaType: MediaType, params: BaseParams = {}) {
  return $api.safeFetch<GenresResponse>(`/genre/${mediaType}/list`, {
    params,
    ...dayCacheTerm,
  });
}
