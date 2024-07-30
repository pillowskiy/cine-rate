'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import useQueryParams from '#hooks/useQueryParams';
import { MovieSort, TVSort } from '#config/enums';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#ui/select';

interface CreationSortSelectProps {
  Sort: typeof MovieSort | typeof TVSort;
}

const localizationSortMethodKeys = {
  [MovieSort.Popular]: 'popular',
  [MovieSort.TopRated]: 'topRated',
  [MovieSort.Upcoming]: 'upcoming',
  [MovieSort.NowPlaying]: 'nowPlaying',
  [TVSort.AiringToday]: 'airingToday',
  [TVSort.OnTheAir]: 'onTheAir',
} satisfies Record<MovieSort | TVSort, string>;

const isLocalizedSortMethod = (
  method: string
): method is keyof typeof localizationSortMethodKeys => {
  return method in localizationSortMethodKeys;
};

export default function CreationSortSelect({ Sort }: CreationSortSelectProps) {
  const t = useTranslations('Creations.CreationSortSelect');
  const { appendQueryParams, urlSearchParams } = useQueryParams();

  const getLocalizedSortMethod = useCallback(
    (method: string | MovieSort | TVSort): string => {
      if (!isLocalizedSortMethod(method)) {
        return method;
      }

      return t(localizationSortMethodKeys[method] as Parameters<typeof t>[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Select
      onValueChange={(newValue) => {
        appendQueryParams({ sort_by: newValue });
      }}
      defaultValue={urlSearchParams.get('sort_by') || undefined}
    >
      <SelectTrigger className='w-[140px] truncate sm:w-[180px]'>
        <SelectValue className='mr-4' placeholder={t('sortResultsBy')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(Sort).map((sortMethod) => (
            <SelectItem key={sortMethod} value={sortMethod}>
              {getLocalizedSortMethod(sortMethod)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
