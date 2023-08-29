import { $api } from '../api/api-interceptor';
import { AccountDetailsResponse, IUser } from '@/app/_types/account-types';
import { cookies } from 'next/headers';

/*
 * TEMP:
 * 1. Configure to own double side store
 * 2. Configure axios cache adapter
 * Yeah, it's variable in server side ;d
 */
let userStore: Map<string, IUser> = new Map();

export async function getSessionUser() {
  const sessionCookie = cookies().get('session_id');
  if (!sessionCookie) return null;

  const { value: session_id } = sessionCookie;
  const user = userStore.get(session_id);
  if (user) return user;

  try {
    const { data } = await $api.get<AccountDetailsResponse>(
      '/3/account/account_id',
      { params: { session_id } }
    );
    userStore.set(session_id, data);
    return data;
  } catch (err) {
    return null;
  }
}
