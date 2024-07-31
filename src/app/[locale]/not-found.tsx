import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '#ui/button';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <main className='absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2 space-y-4 text-center'>
      <h2 className='text-8xl font-bold'>404</h2>
      <span className='text-2xl font-semibold'>{t('title')}</span>
      <p className='text-muted-foreground text-sm sm:text-lg'>
        {t('description')}
      </p>
      <Link href='/' passHref legacyBehavior>
        <Button>{t('action')}</Button>
      </Link>
    </main>
  );
}
