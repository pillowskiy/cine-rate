'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { BookmarkPlus, LogIn } from 'lucide-react';
import { useUserStore } from '#store/user';
import { Target, opacityAnimations } from '#config/animations';
import { Button } from '#ui/button';
import { TitledSection } from '#components/section/titled';

export default function WatchlistCarousel() {
  const user = useUserStore((state) => state.user);

  if (user) return null;

  return (
    <TitledSection
      title='Movies that Conquer the World!'
      subTitle='The most popular blockbusters and unforgettable masterpieces.'
    >
      <m.div
        initial={Target.HIDDEN}
        whileInView={Target.VISIBLE}
        custom={2}
        variants={opacityAnimations}
        className='mt-8 grid w-full place-items-center gap-4 p-8'
      >
        <BookmarkPlus className='size-10' />

        <div className='space-y-1 text-center'>
          <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
            Sign in to access your Watchlist
          </h2>
          <p className='text-muted-foreground text-xs sm:text-sm'>
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <Link href='/auth' passHref legacyBehavior>
          <Button variant='outline'>
            <LogIn className='mr-2 size-5' />
            <span className='truncate'>Sign in with TMDB</span>
          </Button>
        </Link>

        <div className='absolute inset-0 -z-10 size-full'>
          <div className='absolute left-[45%] top-[40%] size-[24px] -translate-x-1/2 animate-pulse rounded-full bg-green-500 blur-xl sm:size-[32px]' />
          <div className='absolute left-1/2 top-[35%] size-[48px] -translate-x-1/2 animate-pulse rounded-full bg-red-500 blur-xl sm:size-[96px]' />
          <div className='absolute left-[55%] top-[40%] size-[32px] -translate-x-1/2 animate-pulse rounded-full bg-blue-500 blur-xl sm:size-[64px]' />
        </div>
      </m.div>
    </TitledSection>
  );
}
