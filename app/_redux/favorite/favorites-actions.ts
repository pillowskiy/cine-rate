import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from "@redux/store";
import type { IApiReject } from '@app/types/index';
import type { ToggleFavoriteData, ToggleFavoriteResponse } from '@app/types/creation-types';

import { rejectAxios } from "@libs/axios";
import axios from "axios";

type AuthThunkConfig = {
    state: RootState,
    dispatch: AppDispatch,
    rejectValue: IApiReject;
}

export const addFavorite = createAsyncThunk<number[], ToggleFavoriteData, AuthThunkConfig>(
    'favorite/add',
    async (data, api) => {
        try {
            await axios.post('/api/favorites', data);
            const { favorites } = api.getState().favorites;
            return data.isFavorite ?
                favorites.filter(id => id !== data.mediaId) :
                favorites.concat(data.mediaId);
        } catch (err) {
            return api.rejectWithValue(rejectAxios(err));
        }
    }
);