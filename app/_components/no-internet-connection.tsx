'use client';

import { WifiOff } from 'lucide-react';
import { useSyncExternalStore } from 'react';

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  }
}

export default function NoInternetConnection() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  if (!isOnline) {
    return (
      <div className='fixed top-0 z-50 flex h-full w-full select-none flex-col items-center justify-center bg-black/70 opacity-80 backdrop-blur-xl'>
        <WifiOff className='h-[48px] w-[48px] animate-pulse' />
        <span className='animate-pulse'>No internet connection.</span>
      </div>
    );
  }

  return null;
}
