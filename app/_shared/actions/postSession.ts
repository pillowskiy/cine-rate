import type { CreateSessionResponse } from '@app/types/auth-types';
import { $api } from '../api/api-interceptor';

export function postSession(requestToken: string) {
  return $api.post<CreateSessionResponse>('/3/authentication/session/new', {
    request_token: requestToken,
  });
}
