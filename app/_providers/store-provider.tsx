'use client';

import type { ReactNode } from 'react';
import { store } from '@redux/store';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
