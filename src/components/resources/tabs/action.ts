import ky from 'ky';
import type { CreationsResponse } from '#types/creation-types';
import { ResourceTarget, ResourceType } from '#config/enums';

interface WatchlistParams extends Record<string, string | number | boolean> {
  page: number;
}

export async function getResources(
  resourceType: ResourceType,
  target: ResourceTarget,
  searchParams?: WatchlistParams
) {
  return ky
    .get(`/api/account/${resourceType}/${target}`, { searchParams })
    .then((res) => res.json<CreationsResponse>());
}
