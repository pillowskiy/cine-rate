'use client';

import { OriginRoutes } from '@config/routes';
import Link from 'next/link';
import { cn } from '@libs/index';
import { usePathname } from 'next/navigation';

export function AppNav() {
  const pathname = usePathname();
  const routes = Object.entries(OriginRoutes);
  console.log(routes);

  return (
    <nav className='flex items-center space-x-6 text-sm font-medium'>
      {routes.map(([name, href]) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
