'use client';

import { createContext, useReducer } from 'react';
import type { AccountStatesResponse } from '#types/creation-types';
import { MediaType } from '#config/enums';

type AccountStatesState =
  | (AccountStatesResponse & { mediaType: MediaType })
  | null;

type AccountStatesAction =
  | {
      type: StatesAction.FAVORITE | StatesAction.WATCHLIST;
    }
  | {
      type: StatesAction.RATED;
      payload: AccountStatesResponse['rated'];
    }
  | {
      type: StatesAction.SET_STATE;
      payload: AccountStatesState;
    };

export enum StatesAction {
  SET_STATE,
  FAVORITE,
  WATCHLIST,
  RATED,
}

const upsertState = (
  state: AccountStatesState,
  value:
    | Partial<NonNullable<AccountStatesState>>
    | keyof NonNullable<AccountStatesState>
): AccountStatesState => {
  if (!state) return null;
  return Object.assign(
    state,
    typeof value === 'string' ? { [value]: !state[value] } : value
  );
};

const reducer = (
  state: AccountStatesState,
  action: AccountStatesAction
): AccountStatesState => {
  switch (action.type) {
    case StatesAction.SET_STATE: {
      return action.payload;
    }
    case StatesAction.FAVORITE: {
      return upsertState(state, 'favorite');
    }
    case StatesAction.RATED: {
      return upsertState(state, { rated: action.payload });
    }
    case StatesAction.WATCHLIST: {
      return upsertState(state, 'watchlist');
    }
    default: {
      throw Error('Unknown action error occurred!');
    }
  }
};

export function useStatesReducer() {
  return useReducer(reducer, null);
}

export const StatesContext = createContext<ReturnType<typeof useStatesReducer>>(
  [null, () => void 0]
);
