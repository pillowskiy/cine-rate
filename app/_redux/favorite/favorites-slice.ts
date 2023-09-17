import * as actions from './favorites-actions';
import { createSlice } from '@reduxjs/toolkit';

interface IFavoriteState {
    favorites: number[]
}

const initialState: IFavoriteState = {
    favorites: [],
};

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.addFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload;
        });
    }
});