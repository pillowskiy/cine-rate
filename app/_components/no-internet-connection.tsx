'use client';

import { useSyncExternalStore } from 'react';

import { WifiOff } from 'lucide-react';

function getSnapshot(): boolean {
  return navigator.onLine;
}

function getServerSnapshot(): boolean {
  return true;
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export default function NoInternetConnection() {
  const isOnline = useSyncExternalStore<boolean>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (!isOnline) {
    return (
      <div className='fixed top-0 z-50 flex size-full select-none flex-col items-center justify-center bg-black/70 opacity-80 backdrop-blur-xl'>
        <WifiOff className='size-[48px] animate-pulse' />
        <span className='animate-pulse'>No internet connection.</span>
      </div>
    );
  }

  return null;
}
