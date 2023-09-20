import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { favoriteSlice } from './favorite/favorites-slice';
import { userSlice } from './user/user-slice';

const rootReducer = combineReducers({
    favorites: favoriteSlice.reducer,
    user: userSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;