import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useReducer, useRef } from 'react';

type Cache<T> = { [url: string]: T };
type State<T> = {
  data: T | null;
  error: AxiosError<{ message: string }> | null;
};

type Action<T> =
  | { type: 'loading' }
  | { type: 'data'; payload: T }
  | { type: 'error'; payload: AxiosError };

// TODO: invalidate cache, test cache
export default function useFetch<T>(
  url: string,
  options: AxiosRequestConfig = {},
  dependencies: Array<unknown> = [],
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
      // @ts-expect-error - TEMP
      newState[action.type] = action.payload;
    }
    return newState;
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url || !dependencies.every(Boolean)) return;
    cancelRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: 'loading' });
      if (cache.current[url]) {
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
  }, [url, ...dependencies]);

  return state;
}
