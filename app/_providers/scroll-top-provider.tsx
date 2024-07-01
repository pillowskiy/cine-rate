'use client';

import { type ReactNode, useEffect } from 'react';

import { usePathname } from 'next/navigation';

export default function ScrollTopProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
