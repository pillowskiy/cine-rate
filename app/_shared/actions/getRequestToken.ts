import type { CreateRequestTokenResponse } from '@app/types/auth-types';
import { $api } from '@api/api-interceptor';

export function getRequestToken() {
  return $api.fetch<CreateRequestTokenResponse>('/authentication/token/new');
}
