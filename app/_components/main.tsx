import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className='h-full container my-4'>
      {children}
    </main>
  );
}
