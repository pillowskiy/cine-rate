import type { AccountDetailsResponse } from '#types/account-types';
import { $api } from '#api/api-interceptor';

export async function getSessionUser(session_id: string) {
  return $api.fetch<AccountDetailsResponse>('/account/account_id', {
    params: { session_id },
  });
}
