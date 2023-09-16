import { Button } from '@/app/_components/ui/button';
import { BookmarkPlus, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistCarousel() {
  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            From your watchlist
          </h2>
          <p className='text-sm text-muted-foreground'>
            Discover top picks from your watchlist.
          </p>
        </div>
      </div>

      <div className='grid w-full place-items-center gap-4 p-4'>
        <BookmarkPlus className='h-10 w-10' />

        <div className='space-y-1 text-center'>
          <h2 className='text-xl sm:text-2xl font-semibold tracking-tight'>
            Sign in to access your Watchlist
          </h2>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <Link href='/auth' passHref legacyBehavior>
          <Button variant='outline'>
            <LogIn className='mr-2 h-5 w-5' />
            <span>Sign in with TMDB</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
