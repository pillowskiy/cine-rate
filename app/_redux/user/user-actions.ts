import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from "@redux/store";
import type { IApiReject } from '@app/types/index';
import type { AccountDetailsResponse } from '@app/types/account-types';
import { fetch, rejectFetch } from '@libs/common/fetch';

type AuthThunkConfig = {
    state: RootState,
    dispatch: AppDispatch,
    rejectValue: IApiReject;
}

export const approve = createAsyncThunk<AccountDetailsResponse, string, AuthThunkConfig>(
    'user/approve',
    async (request_token, api) => {
        try {
            return fetch<AccountDetailsResponse>('/api/user/approve', {
                params: { request_token }
            });
        } catch (err) {
            return api.rejectWithValue(rejectFetch(err));
        }
    },
);

export const getUser = createAsyncThunk<AccountDetailsResponse, undefined, AuthThunkConfig>(
    'user/',
    async (_, api) => {
        try {
            return fetch<AccountDetailsResponse>('/api/user/');
        } catch (err) {
            return api.rejectWithValue(rejectFetch(err));
        }
    },
);
