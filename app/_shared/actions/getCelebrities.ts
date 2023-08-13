import type { CelebritiesResponse } from '@app/types/celebrity-types';
import { $api } from '../api/api-interceptor';

interface GetCelebritiesOptions {
  language?: string;
  page?: string;
}

export const getCelebrities = ({
  language = 'es-US',
}: GetCelebritiesOptions) => {
  return $api.get<CelebritiesResponse>(`/3/person/popular`, {
    params: { language },
  });
};
