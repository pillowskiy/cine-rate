'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

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
