'use client';

import { OriginRoutes } from '@config/routes';
import Link from 'next/link';
import { cn } from '@libs/index';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

interface AppNavProps extends Omit<ComponentProps<'nav'>, 'children'> {}

export function AppNav({ className, ...props }: AppNavProps) {
  const pathname = usePathname();
  const routes = Object.entries(OriginRoutes);

  return (
    <nav className={cn('text-sm font-medium', className)} {...props}>
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
