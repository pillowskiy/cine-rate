import { IUser } from '@/app/_types/account-types';
import * as actions from './user-actions';
import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.approve.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.approve.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(actions.approve.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(actions.getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(actions.getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});