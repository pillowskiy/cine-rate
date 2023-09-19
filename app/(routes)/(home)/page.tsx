import TrendsCarousel from './trends-carousel';
import MoviesCarousel from './movies-carousel';
import CelebrityCarousel from './celebrity-carousel';
import WatchlistCarousel from './watchlist-carousel';
import SeriesCarousel from './series-carousel';

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
