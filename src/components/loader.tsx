import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Loader2 className='size-[64px] animate-spin' />
    </div>
  );
}
