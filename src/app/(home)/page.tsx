import { default as nextDynamic } from 'next/dynamic';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import CelebrityCarousel from './celebrity-carousel';
import MoviesCarousel from './movies-carousel';
import SeriesCarousel from './series-carousel';
import TrendsCarousel from './trends-carousel';

export const dynamic = 'force-static';
export const revalidate = 3600 * 24;

const WatchlistCarousel = nextDynamic(() => import('./watchlist-carousel'), {
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
