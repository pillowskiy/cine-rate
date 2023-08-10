import { Input } from '@ui/input';

export function SearchInput() {
  return (
    <div>
      <Input
        type='search'
        placeholder='Search...'
        className='md:w-[100px] lg:w-[300px] text-sm'
      />
    </div>
  );
}
