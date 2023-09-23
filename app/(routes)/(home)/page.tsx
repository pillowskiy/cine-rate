import TrendsCarousel from './trends-carousel';
import MoviesCarousel from './movies-carousel';
import CelebrityCarousel from './celebrity-carousel';
import SeriesCarousel from './series-carousel';

import dynamic from 'next/dynamic';

// Hydrating suspense boundary
const WatchlistCarousel = dynamic(() => import('./watchlist-carousel'), {
  ssr: false,
});

export default async function Home() {
  return (
    <main className='min-h-screen w-full space-y-6'>
      <TrendsCarousel />
      <MoviesCarousel />
      <SeriesCarousel />
      <WatchlistCarousel />
      <CelebrityCarousel />
    </main>
  );
}
