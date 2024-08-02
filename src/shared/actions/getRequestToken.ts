import type { CreateRequestTokenResponse } from '#types/auth-types';
import { generateCache } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getRequestToken() {
  return $api.fetch<CreateRequestTokenResponse>('/authentication/token/new', {
    ...generateCache('static', { revalidate: 10 * 60 }),
  });
}
