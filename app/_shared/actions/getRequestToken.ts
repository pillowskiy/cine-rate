import type { CreateRequestTokenResponse } from '@app/types/auth-types';
import { $api } from '../api/api-interceptor';

export function getRequestToken() {
  return $api.get<CreateRequestTokenResponse>('/3/authentication/token/new');
}
