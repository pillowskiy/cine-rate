import TrendsCarousel from './trends-carousel';
import MoviesCarousel from './movies-carousel';
import CelebrityCarousel from './celebrity-carousel';
import SeriesCarousel from './series-carousel';

import dynamic from 'next/dynamic';
import { LoadingCarousel } from '@/app/_components/loading-carousel';
import { Suspense } from 'react';

// Hydrating suspense boundary
const WatchlistCarousel = dynamic(() => import('./watchlist-carousel'), {
  ssr: false,
});

export default async function Home() {
  return (
    <main className='min-h-screen w-full space-y-6'>
      <Suspense fallback={<LoadingCarousel />}>
        <TrendsCarousel />
      </Suspense>
      <Suspense fallback={<LoadingCarousel className='mt-6' aspect='horizontal' />}>
        <MoviesCarousel />
      </Suspense>
      <Suspense fallback={<LoadingCarousel className='mt-6' aspect='horizontal' />}>
        <SeriesCarousel />
      </Suspense>
      <WatchlistCarousel />
      <Suspense fallback={<LoadingCarousel />}>
        <CelebrityCarousel />
      </Suspense>
    </main>
  );
}
