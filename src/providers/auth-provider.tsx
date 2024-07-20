'use client';

import { ReactNode, useEffect } from 'react';
import { useUserStore } from '#store/user';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.dirty) {
      void userStore.getUser().catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
