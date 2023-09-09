import type { MultiSearchResponse } from '@app/types/search-types';
import { $api } from '@/app/_shared/api/api-interceptor';

export async function getMultiSearch(query: string) {
  return $api.get<MultiSearchResponse>('/3/search/multi', {
    params: { query },
  });
}
