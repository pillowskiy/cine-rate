import { $api } from '../api/api-interceptor';
import type { AccountDetailsResponse } from '@app/types/account-types';

export async function getSessionUser(session_id: string) {
  return $api.get<AccountDetailsResponse>(
    '/3/account/account_id',
    { params: { session_id } }
  );
}
