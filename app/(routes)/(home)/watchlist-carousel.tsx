'use client';

import { Button } from '@ui/button';
import { Heading } from '@components/heading';
import { MSeparator } from '@ui/separator';
import { BookmarkPlus, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@redux/hooks';
import { motion } from 'framer-motion';
import { Target, opacityAnimations } from '@config/animations';

export default function WatchlistCarousel() {
  const { user, isLoading } = useAuth();
  if (user || isLoading) return null;

  return (
    <motion.section
      viewport={{ once: true }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      className='relative'
    >
      <Heading
        title='From your watchlist'
        description='Discover top picks from your watchlist.'
      />
      <MSeparator className='my-4' />

      <motion.div
        custom={2}
        variants={opacityAnimations}
        className='mt-8 grid w-full place-items-center gap-4 p-8'
      >
        <BookmarkPlus className='h-10 w-10' />

        <div className='space-y-1 text-center'>
          <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
            Sign in to access your Watchlist
          </h2>
          <p className='text-xs text-muted-foreground sm:text-sm'>
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <Link href='/auth' passHref legacyBehavior>
          <Button variant='outline'>
            <LogIn className='mr-2 h-5 w-5' />
            <span className='truncate'>Sign in with TMDB</span>
          </Button>
        </Link>

        <div className='absolute inset-0 -z-10 h-full w-full'>
          <div className='absolute left-[45%] top-[40%] h-[24px] w-[24px] -translate-x-[50%] animate-pulse rounded-full bg-green-500 blur-xl sm:h-[32px] sm:w-[32px]' />
          <div className='absolute left-[50%] top-[35%] h-[48px] w-[48px] -translate-x-[50%] animate-pulse rounded-full bg-red-500 blur-xl sm:h-[96px] sm:w-[96px]' />
          <div className='absolute left-[55%] top-[40%] h-[32px] w-[32px] -translate-x-[50%] animate-pulse rounded-full bg-blue-500 blur-xl sm:h-[64px] sm:w-[64px]' />
        </div>
      </motion.div>
    </motion.section>
  );
}
