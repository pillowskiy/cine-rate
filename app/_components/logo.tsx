import Link from 'next/link';

// TEMP
export function Logo() {
  return (
    <Link href='/' className='mr-6 flex items-center space-x-2'>
      <p className='w-min rounded-md bg-primary p-2 text-sm text-primary-foreground'>
        CineRate
      </p>
    </Link>
  );
}
