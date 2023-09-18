import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className='absolute translate-x-[50%] translate-y-[50%] top-[50%] right-[50%]'>
      <Loader2 className='h-[64px] w-[64px] animate-spin' />
    </div>
  );
}
