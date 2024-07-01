'use client';

import useQueryParams from '#hooks/useQueryParams';
import type { MovieSort, TVSort } from '#config/enums';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#ui/select';
import { capitalize } from '#libs/index';

interface CreationSortSelectProps {
  Sort: typeof MovieSort | typeof TVSort;
}

export function CreationSortSelect({ Sort }: CreationSortSelectProps) {
  const { appendQueryParams, urlSearchParams } = useQueryParams();

  return (
    <Select
      onValueChange={(newValue) => {
        appendQueryParams({ sort_by: newValue });
      }}
      defaultValue={urlSearchParams.get('sort_by') || undefined}
    >
      <SelectTrigger className='w-[140px] truncate sm:w-[180px]'>
        <SelectValue className='mr-4' placeholder='Sort results by' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(Sort).map((sortMethod) => (
            <SelectItem key={sortMethod} value={sortMethod}>
              {capitalize(sortMethod.replace('_', ' '), {
                assignLowerCase: true,
              })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
