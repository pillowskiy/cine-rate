'use client';

import { cn } from '@/app/_libs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <p className='w-min rounded-md bg-primary p-2 text-sm text-primary-foreground'>
          CineRate
        </p>
      </Link>
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        <Link
          href='/movie'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/movie' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Movies
        </Link>

        <Link
          href='/tv'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/tv' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          TV Shows
        </Link>

        <Link
          href='#events'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/events' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Watch
        </Link>

        <Link
          href='/celebrities'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/celebrities' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Celebrities
        </Link>

        <Link
          href='#events'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/events' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Events
        </Link>
      </nav>
    </div>
  );
}
