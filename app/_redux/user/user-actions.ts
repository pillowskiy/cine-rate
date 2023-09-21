import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from "@redux/store";
import type { IApiReject } from '@app/types/index';

import { rejectAxios } from "@libs/axios";
import axios from "axios";
import { AccountDetailsResponse } from '@/app/_types/account-types';

type AuthThunkConfig = {
    state: RootState,
    dispatch: AppDispatch,
    rejectValue: IApiReject;
}

export const approve = createAsyncThunk<AccountDetailsResponse, string, AuthThunkConfig>(
    'user/approve',
    async (request_token, api) => {
        try {
            return axios.get('/api/user/approve', {
                params: { request_token }
            }).then(({ data }) => data);
        } catch (err) {
            return api.rejectWithValue(rejectAxios(err));
        }
    },
);

export const getUser = createAsyncThunk<AccountDetailsResponse, never, AuthThunkConfig>(
    'user/',
    async (_, api) => {
        try {
            return axios.get<AccountDetailsResponse>('/api/user/').then(({ data }) => data);
        } catch (err) {
            return api.rejectWithValue(rejectAxios(err));
        }
    },
);
