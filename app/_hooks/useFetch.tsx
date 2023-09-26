import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useReducer, useRef } from 'react';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
  PUT = 'put',
}

type Cache<T> = { [url: string]: T };
type State<T> = {
  data: T | null;
  // TEMP;
  error: AxiosError<{ message: string }> | null;
};

type Action<T> =
  | { type: 'loading' }
  | { type: 'data'; payload: T }
  | { type: 'error'; payload: AxiosError };

// TODO: invalidate cache, test cache
export function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef(false);

  const initialState: State<T> = {
    error: null,
    data: null,
  };

  const fetchReducer = (_: State<T>, action: Action<T>): State<T> => {
    const newState = { ...initialState };
    if ('payload' in action) {
      // @ts-expect-error
      newState[action.type] = action.payload;
    }
    return newState;
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;
    cancelRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: 'loading' });
      if (cache.current[url]) {
        console.log('Cached data found');
        return void dispatch({
          type: 'data',
          payload: cache.current[url],
        });
      }

      axios
        .get<T>(url, options)
        .then(({ data }) => {
          cache.current[url] = data;
          if (cancelRequest.current) return;
          dispatch({ type: 'data', payload: data });
        })
        .catch((err) => {
          if (cancelRequest.current) return;
          dispatch({ type: 'error', payload: err as AxiosError });
        });
    };

    void fetchData();
    return () => void (cancelRequest.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}
