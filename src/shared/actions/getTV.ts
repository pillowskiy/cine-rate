import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import { TVSort } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getTV(sort: TVSort, params?: BaseParams) {
  return $api.safeFetch<CreationsResponse>(`/tv/${sort}`, { params });
}
