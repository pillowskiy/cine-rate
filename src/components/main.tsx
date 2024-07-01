import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className='container my-4 h-full'>{children}</main>;
}
