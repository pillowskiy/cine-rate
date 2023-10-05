import type { CreateSessionResponse } from '@app/types/auth-types';
import { $api } from '@api/api-interceptor';

export function postSession(requestToken: string) {
  return $api.fetch<CreateSessionResponse>('/3/authentication/session/new', {
    body: JSON.stringify({ request_token: requestToken }),
    method: 'POST',
  });
}
