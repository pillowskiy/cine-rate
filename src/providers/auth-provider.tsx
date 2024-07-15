'use client';

import { ReactNode, useEffect } from 'react';
import { useUserStore } from '#store/user';

interface AuthProviderProps {
  children: ReactNode;
}

// TEMP: use next-auth for integration with tmdb oAuth;
export default function AuthProvider({ children }: AuthProviderProps) {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.getUser().catch(() => null);
  }, [userStore]);

  return children;
}
