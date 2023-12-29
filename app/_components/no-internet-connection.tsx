'use client';

import { WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NoInternetConnection() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  if (!online) {
    return (
      <div className='fixed top-0 z-50 flex h-full w-full select-none flex-col items-center justify-center bg-black/70 opacity-80 backdrop-blur-xl'>
        <WifiOff className='h-[48px] w-[48px] animate-pulse' />
        <span className='animate-pulse'>No internet connection.</span>
      </div>
    );
  }

  return null;
}
