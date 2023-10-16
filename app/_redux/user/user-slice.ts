import type { IUser } from '@app/types/account-types';
import * as actions from './user-actions';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

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
    // Approve
    builder
      .addCase(actions.approve.fulfilled, (state, action) => {
        state.user = action.payload;
      })

    // Get User
    builder
      .addCase(actions.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(actions.getUser.rejected, (state) => {
        state.user = null;
      });

    // Logout
    builder
      .addCase(actions.logout.fulfilled, (state) => {
        state.user = null;
      })

    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false;
      })
  }
});