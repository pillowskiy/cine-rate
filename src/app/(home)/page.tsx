import dynamic from 'next/dynamic';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';

const TrendsCarousel = dynamic(() => import('./trends-carousel'), {
  loading: () => <LoadingCarousel />,
  ssr: false,
});
const MoviesCarousel = dynamic(() => import('./movies-carousel'), {
  loading: () => <LoadingCarousel className='mt-6' aspect='horizontal' />,
  ssr: false,
});
const SeriesCarousel = dynamic(() => import('./series-carousel'), {
  loading: () => <LoadingCarousel className='mt-6' aspect='horizontal' />,
  ssr: false,
});
const CelebrityCarousel = dynamic(() => import('./celebrity-carousel'), {
  loading: () => <LoadingCarousel />,
  ssr: false,
});

// Hydrating suspense boundary
const WatchlistCarousel = dynamic(() => import('./watchlist-carousel'), {
  ssr: false,
  loading: () => <LoadingCarousel className='mt-6' aspect='horizontal' />,
});

export default async function Home() {
  return (
    <main className='min-h-screen w-full space-y-6'>
      <TrendsCarousel />
      <MoviesCarousel />
      <SeriesCarousel />
      <CelebrityCarousel />
      <WatchlistCarousel />
    </main>
  );
}
