'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

export function CreationShowSelect() {
  return (
    <Select defaultValue='all'>
      <SelectTrigger className='w-[120px] sm:w-[180px] truncate'>
        <SelectValue placeholder='Show me' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='all'>All</SelectItem>
          <SelectItem value='watched'>Watched</SelectItem>
          <SelectItem value='unwatched'>Unwatched</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
