import type { Sort as MovieSort } from '@actions/getMovies';
import type { Sort as TVSort } from '@actions/getTV';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { capitalize } from '@libs/index';

interface CreationSortSelectProps {
  Sort: typeof MovieSort | typeof TVSort;
}

export function CreationSortSelect({ Sort }: CreationSortSelectProps) {
  return (
    <Select defaultValue={Sort.Popular}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Sort results by' />
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
