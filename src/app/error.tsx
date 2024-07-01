'use client';

// Error components must be Client Components
import { useEffect } from 'react';
import { Button } from '#ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.stack);
  }, [error]);

  return (
    <main className='absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2 space-y-4 text-center'>
      <h2 className='text-6xl'>Oops!</h2>
      <p className='text-muted-foreground text-lg'>Something went wrong.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
