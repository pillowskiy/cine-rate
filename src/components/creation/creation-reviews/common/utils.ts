import { type Dispatch, createContext } from 'react';

interface PaginationState {
  page: number;
  totalPages: number;
}

type PaginationAction =
  | {
      type: PaginationActionType.SetPage | PaginationActionType.SetTotalPages;
      payload: number;
    }
  | {
      type: PaginationActionType.NextPage | PaginationActionType.PrevPage;
    };

type PaginationContextInitial = [PaginationState, Dispatch<PaginationAction>];

export const initialPaginationState: PaginationState = {
  page: 1,
  totalPages: 0,
};

export enum PaginationActionType {
  SetPage = 'SET_PAGE',
  SetTotalPages = 'SET_TOTAL_PAGES',
  NextPage = 'NEXT_PAGE',
  PrevPage = 'PREV_PAGE',
}

export function paginationReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case PaginationActionType.SetPage:
      return {
        ...state,
        page: action.payload,
      };
    case PaginationActionType.SetTotalPages:
      return {
        ...state,
        totalPages: action.payload,
      };
    case PaginationActionType.NextPage:
      return {
        ...state,
        page: state.page + 1,
      };
    case PaginationActionType.PrevPage:
      return {
        ...state,
        page: state.page - 1,
      };
    default:
      return state;
  }
}

export const PaginationContext = createContext<PaginationContextInitial>([
  initialPaginationState,
  () => null,
]);
