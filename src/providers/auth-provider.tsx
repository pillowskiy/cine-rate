'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '#store/hooks';
import { getUser } from '#store/user/user-actions';

interface AuthProviderProps {
  children: ReactNode;
}

// TEMP: use next-auth for integration with tmdb oAuth;
export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .catch(() => null);
  }, [dispatch]);

  return children;
}
