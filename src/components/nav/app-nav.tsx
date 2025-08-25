'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { OriginRoutes } from '#config/routes';
import { cn } from '#libs/index';

interface AppNavProps extends Omit<LinkProps, 'href'> {
  className?: string;
}

const routeTranslationsKeyMapping = {
  [OriginRoutes.TV]: 'tv',
  [OriginRoutes.Movies]: 'movies',
  [OriginRoutes.Celebrities]: 'celebrities',
} as const satisfies Record<OriginRoutes, string>;

export function AppNav({ className, ...props }: AppNavProps) {
  const t = useTranslations('Nav.AppNav');
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
            pathname.endsWith(href) ? 'text-foreground' : 'text-foreground/60'
          )}
          {...props}
        >
          {t(
            routeTranslationsKeyMapping[
              OriginRoutes[name as keyof typeof OriginRoutes]
            ]
          )}
        </Link>
      ))}
    </nav>
  );
}
