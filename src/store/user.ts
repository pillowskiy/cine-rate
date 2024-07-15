import ky from 'ky';
import { create } from 'zustand';
import { AccountDetailsResponse, IUser } from '#types/account-types';
import { IApiReject } from '#types/index';
import { rejectKy } from '#libs/ky';

interface IUserState {
  user: IUser | null;
  isLoading: boolean;

  approve: (
    request_token: string
  ) => Promise<AccountDetailsResponse | IApiReject>;
  getUser: () => Promise<AccountDetailsResponse | IApiReject>;
  logout: () => Promise<boolean | IApiReject>;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  isLoading: false,
  approve: async (request_token: string) => {
    return ky
      .get('/api/user/approve', {
        searchParams: { request_token },
      })
      .then((res) => res.json<AccountDetailsResponse>())
      .then((details) => {
        set({ user: details });
        return details;
      })
      .catch(rejectKy);
  },
  getUser: async () => {
    return ky
      .get('/api/user/', {
        cache: 'force-cache',
        next: {
          tags: ['user'],
        },
      })
      .then((res) => res.json<AccountDetailsResponse>())
      .then((details) => {
        set({ user: details });
        return details;
      })
      .catch(rejectKy);
  },
  logout: async () => {
    return ky
      .delete('/api/user')
      .then((res) => res.json<boolean>())
      .then((data) => {
        set({ user: null });
        return data;
      })
      .catch(rejectKy);
  },
}));
