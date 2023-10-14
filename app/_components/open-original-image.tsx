import Link from 'next/link';
import { TMDB_IMAGE_URL } from '@libs/tmdb';

export function OpenOriginalImage({ path }: { path: string }) {
  return (
    <Link
      className='text-xs text-foreground/50 transition-all hover:text-foreground hover:underline'
      href={TMDB_IMAGE_URL + 'original' + path}
      target='_blank'
    >
      Open original
    </Link>
  );
}
