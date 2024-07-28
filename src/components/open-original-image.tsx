import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TMDB_IMAGE_URL } from '#libs/tmdb';

export function OpenOriginalImage({ path }: { path: string }) {
  const t = useTranslations();

  return (
    <Link
      className='text-foreground/50 hover:text-foreground text-xs transition-all hover:underline'
      href={TMDB_IMAGE_URL + 'original' + path}
      target='_blank'
    >
      {t('openOriginal')}
    </Link>
  );
}
