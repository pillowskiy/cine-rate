import ky from 'ky';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AccountDetailsResponse, IUser } from '#types/account-types';
import { IApiReject } from '#types/index';
import { rejectKy } from '#libs/ky';

interface IUserState {
  user: IUser | null;
  dirty: boolean;

  approve: (
    request_token: string
  ) => Promise<AccountDetailsResponse | IApiReject>;
  getUser: () => Promise<AccountDetailsResponse | IApiReject>;
  logout: () => Promise<boolean | IApiReject>;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      user: null,
      dirty: true,
      approve: async (request_token: string) => {
        return ky
          .get('/api/user/approve', {
            searchParams: { request_token },
          })
          .then((res) => res.json<AccountDetailsResponse>())
          .then((details) => {
            set({ user: details, dirty: false });
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
            set({ user: details, dirty: false });
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
    }),
    {
      name: 'user',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
