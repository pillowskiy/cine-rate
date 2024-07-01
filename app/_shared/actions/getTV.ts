import type { CreationsResponse } from '@app/types/creation-types';
import type { BaseParams } from '@app/types/index';
import { TVSort } from '@config/enums';
import { $api } from '@api/api-interceptor';

export function getTV(sort: TVSort, params?: BaseParams) {
  return $api.safeFetch<CreationsResponse>(`/tv/${sort}`, { params });
}
