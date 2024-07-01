'use client';

import Link from 'next/link';
import { useAuth } from '@redux/hooks';
import { m } from 'framer-motion';
import { BookmarkPlus, LogIn } from 'lucide-react';
import { Target, opacityAnimations } from '@config/animations';
import { Button } from '@ui/button';
import { MSeparator } from '@ui/separator';
import { Heading } from '@components/heading';

export default function WatchlistCarousel() {
  const { user, isLoading } = useAuth();
  if (user || isLoading) return null;

  return (
    <m.section
      viewport={{ once: true, amount: 0.4 }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      className='relative'
    >
      <Heading
        title='From your watchlist'
        description='Discover top picks from your watchlist.'
      />
      <MSeparator className='my-4' />

      <m.div
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
          <div className='absolute left-[45%] top-[40%] size-[24px] -translate-x-[50%] animate-pulse rounded-full bg-green-500 blur-xl sm:size-[32px]' />
          <div className='absolute left-[50%] top-[35%] size-[48px] -translate-x-[50%] animate-pulse rounded-full bg-red-500 blur-xl sm:size-[96px]' />
          <div className='absolute left-[55%] top-[40%] size-[32px] -translate-x-[50%] animate-pulse rounded-full bg-blue-500 blur-xl sm:size-[64px]' />
        </div>
      </m.div>
    </m.section>
  );
}
