'use client';

import { ReactNode, useLayoutEffect } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { getUser } from '@redux/user/user-actions';

interface AuthProviderProps {
  children: ReactNode;
}

// TEMP: use next-auth for integration with tmdb oAuth;
export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return children;
}
