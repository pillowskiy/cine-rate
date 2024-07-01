import type { MultiSearchResponse } from '#types/search-types';
import { $api } from '#api/api-interceptor';

export async function getMultiSearch(query: string) {
  return $api.safeFetch<MultiSearchResponse>('/search/multi', {
    params: { query },
  });
}
