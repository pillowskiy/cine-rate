import { createContext, useCallback, useContext, useState } from 'react';
import useQueryParams from '#hooks/useQueryParams';
import type { GetDiscoverParams } from '#actions/getDiscover';

export type FilterDiscoverParams = Partial<GetDiscoverParams>;

export const CreationFilterContext = createContext<ReturnType<
  typeof useCreationFilterParams
> | null>(null);

export function useCreationFilterContext() {
  const ctx = useContext(CreationFilterContext);
  if (!ctx) {
    throw new Error('FilterContext must be used within a FilterProvider');
  }
  return ctx;
}

export function useCreationFilterParams() {
  const query = useQueryParams();
  const queryParamsObj = Object.fromEntries(query.urlSearchParams.entries());
  const [filter, setFilter] = useState<FilterDiscoverParams>(queryParamsObj);

  const updateFilter = useCallback((params: FilterDiscoverParams) => {
    return setFilter((prev) => ({ ...prev, ...params }));
  }, []);

  const commitFilter = useCallback(() => {
    query.setQueryParams(filter);
  }, [filter, query]);

  return {
    filter,
    updateFilter,
    commitFilter,
  };
}
