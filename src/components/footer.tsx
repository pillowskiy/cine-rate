import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className='border-t py-6'>
      <div className='container space-y-4'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-semibold'>{t('madeWith')}</span>
          <Link href='https://nextjs.org/'>
            <Image
              className='h-4 w-auto'
              src='/next.svg'
              alt='Next Logo'
              width={96}
              height={96}
            />
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-semibold'>{t('dataProvidenBy')}</span>
          <Link href='https://www.themoviedb.org/'>
            <Image
              className='h-4 w-auto'
              src='/tmdb-logo.svg'
              alt='TMDB Logo'
              width={96}
              height={96}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
