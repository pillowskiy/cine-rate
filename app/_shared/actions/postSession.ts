import type { CreateSessionResponse } from '@app/types/auth-types';
import { $api } from '@api/api-interceptor';

export function postSession(requestToken: string) {
  return $api.fetch<CreateSessionResponse>('/authentication/session/new', {
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
  });
}
