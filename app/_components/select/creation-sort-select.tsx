'use client';

import type { MovieSort, TVSort } from '@config/enums';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { capitalize } from '@libs/index';
import useQueryParams from '@hooks/useQueryParams';

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
      <SelectTrigger className='w-[120px] sm:w-[180px]'>
        <SelectValue className='mr-2' placeholder='Sort results by' />
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
