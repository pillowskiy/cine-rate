'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { OriginRoutes } from '#config/routes';
import { cn } from '#libs/index';

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
            'hover:text-foreground/80 transition-colors',
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
