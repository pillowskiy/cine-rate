import Link from 'next/link';
import { Button } from '../_components/ui/button';

export default function NotFound() {
  return (
    <main className='absolute left-[50%] top-[50%] h-fit -translate-x-[50%] -translate-y-[50%] space-y-4 text-center'>
      <h2 className='text-8xl font-bold'>404</h2>
      <span className='text-2xl font-semibold'>Not Found</span>
      <p className='text-sm text-muted-foreground sm:text-lg'>
        The resource requested could not be found.
      </p>
      <Link href='/' passHref legacyBehavior>
        <Button>Home</Button>
      </Link>
    </main>
  );
}
