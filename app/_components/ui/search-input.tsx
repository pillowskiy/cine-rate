import { Input } from '@ui/input';

export function SearchInput() {
  return (
    <Input
      type='search'
      placeholder='Search...'
      className='text-sm lg:w-[300px]'
    />
  );
}
