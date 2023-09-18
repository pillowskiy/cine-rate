import { $api } from '../api/api-interceptor';
import type { AccountDetailsResponse } from '@app/types/account-types';
import { cookies } from 'next/headers';

export async function getSessionUser(sessionId?: string) {
  const sessionCookie = cookies().get('session_id');
  const session_id = sessionId || sessionCookie?.value;
  if (!session_id) throw new Error('Session ID is required!');

  const { data } = await $api.get<AccountDetailsResponse>(
    '/3/account/account_id',
    { params: { session_id } }
  );
  return data;
}
