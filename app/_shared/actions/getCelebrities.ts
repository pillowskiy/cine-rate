import type { CelebritiesResponse } from '@app/types/person-types';
import { $api } from '../api/api-interceptor';
import { BaseParams } from '@app/types/index';

export const getCelebrities = (params?: BaseParams) => {
  return $api.get<CelebritiesResponse>(`/3/person/popular`, {
    params,
  });
};
