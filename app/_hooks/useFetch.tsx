import { useEffect, useReducer, useRef } from 'react';
import { type RequestConfig, fetch } from '@libs/common/fetch';

type Cache<T> = { [url: string]: T };
type State<T> = {
  data: T | null;
  error: Response | null;
};

type Action<T> =
  | { type: 'loading' }
  | { type: 'data'; payload: T }
  | { type: 'error'; payload: Response };

// TODO: invalidate cache, test cache
export default function useFetch<T>(
  url: string,
  options: RequestConfig = {},
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

      fetch<T>(url, options)
        .then((data) => {
          cache.current[url] = data;
          if (cancelRequest.current) return;
          dispatch({ type: 'data', payload: data });
        })
        .catch((err) => {
          if (cancelRequest.current) return;
          dispatch({ type: 'error', payload: err as Response });
        });
    };

    void fetchData();
    return () => void (cancelRequest.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependencies]);

  return state;
}
