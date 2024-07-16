import CelebrityCarousel from './celebrity-carousel';
import MoviesCarousel from './movies-carousel';
import SeriesCarousel from './series-carousel';
import TrendsCarousel from './trends-carousel';
import WatchlistCarousel from './watchlist-carousel';

export const dynamic = 'force-static';
export const revalidate = 3600 * 24;

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
