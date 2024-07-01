import Link from 'next/link';
import { TMDB_IMAGE_URL } from '@libs/tmdb';

export function OpenOriginalImage({ path }: { path: string }) {
  return (
    <Link
      className='text-foreground/50 hover:text-foreground text-xs transition-all hover:underline'
      href={TMDB_IMAGE_URL + 'original' + path}
      target='_blank'
    >
      Open original
    </Link>
  );
}
