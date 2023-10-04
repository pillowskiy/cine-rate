'use client';

import { WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useClientReady } from '@hooks/useClientReady';

export default function NoInternetConnection() {
  const [online, setOnline] = useState(false);
  const isClientReady = useClientReady();
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  if (!isClientReady) return null;

  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  if (!online) {
    return (
      <div className='fixed top-0 z-50 select-none flex h-full w-full flex-col items-center justify-center backdrop-blur-xl bg-black/70 opacity-80'>
        <WifiOff className='h-[48px] w-[48px] animate-pulse' />
        <span className='animate-pulse'>No internet connection.</span>
      </div>
    );
  }

  return null;
}
