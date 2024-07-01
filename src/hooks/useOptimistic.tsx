import { SetStateAction, useRef, useState } from 'react';

interface OptimisticActionOptions<T> {
  onResolve?: (res: Awaited<T>) => unknown;
  onReject?: (err: unknown) => unknown;
}

export function useOptimistic<State>(
  initialState: State,
  stateChanges: SetStateAction<State>
) {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const previousState = useRef<State>(state);

  async function action<T>(
    callback: () => Promise<T>,
    { onReject, onResolve }: OptimisticActionOptions<T> = {}
  ) {
    try {
      setState(stateChanges);
      setIsLoading(true);
      const data = await callback();
      if (onResolve) onResolve(data);
    } catch (err) {
      if (onReject) onReject(err);
      setState(previousState.current);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, state, action };
}
