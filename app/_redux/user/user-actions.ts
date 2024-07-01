import type { AppDispatch, RootState } from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ky from 'ky';
import type { AccountDetailsResponse } from '@app/types/account-types';
import type { IApiReject } from '@app/types/index';
import { rejectKy } from '@libs/ky';

type AuthThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: IApiReject;
};

export const approve = createAsyncThunk<
  AccountDetailsResponse,
  string,
  AuthThunkConfig
>('user/approve', async (request_token, api) => {
  return ky
    .get('/api/user/approve', {
      searchParams: { request_token },
    })
    .then((res) => res.json<AccountDetailsResponse>())
    .catch(async (error) => {
      const apiReject = await rejectKy(error);
      return api.rejectWithValue(apiReject);
    });
});

export const getUser = createAsyncThunk<
  AccountDetailsResponse,
  undefined,
  AuthThunkConfig
>('user/', async (_, api) => {
  return ky
    .get('/api/user/')
    .then((res) => res.json<AccountDetailsResponse>())
    .catch(async (error) => {
      const apiReject = await rejectKy(error);
      return api.rejectWithValue(apiReject);
    });
});

export const logout = createAsyncThunk<boolean, undefined, AuthThunkConfig>(
  'users/logout',
  async (_, api) => {
    return ky
      .delete('/api/user')
      .then((res) => res.json<boolean>())
      .catch(async (error) => {
        const apiReject = await rejectKy(error);
        return api.rejectWithValue(apiReject);
      });
  }
);
