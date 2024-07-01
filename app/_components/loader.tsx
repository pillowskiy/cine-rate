import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className='absolute right-[50%] top-[50%] translate-x-[50%] translate-y-[50%]'>
      <Loader2 className='size-[64px] animate-spin' />
    </div>
  );
}
