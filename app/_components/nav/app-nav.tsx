'use client';

import { OriginRoutes } from '@config/routes';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@libs/index';
import { usePathname } from 'next/navigation';

interface AppNavProps extends Omit<LinkProps, 'href'> {
  className?: string;
}

export function AppNav({ className, ...props }: AppNavProps) {
  const pathname = usePathname();
  const routes = Object.entries(OriginRoutes);

  return (
    <nav className={cn('text-sm font-medium', className)}>
      {routes.map(([name, href]) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === href ? 'text-foreground' : 'text-foreground/60'
          )}
          {...props}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
