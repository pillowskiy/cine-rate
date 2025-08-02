'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '#ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');
  useEffect(() => void console.error(error.stack), [error]);

  return (
    <main className='absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2 space-y-4 text-center'>
      <h2 className='text-6xl'>{t('title')}</h2>
      <p className='text-lg text-muted-foreground'>{t('description')}</p>
      <Button onClick={() => reset()}>{t('action')}</Button>
    </main>
  );
}
