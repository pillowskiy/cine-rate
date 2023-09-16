import { MediaType } from '@app/types/index';
import TrendsCarousel from './trends-carousel';
import MoviesCarousel from './movies-carousel';
import CreationCarousel from './creation-carousel';
import CelebrityCarousel from './celebrity-carousel';
import WatchlistCarousel from './watchlist-carousel';

export default async function Home() {
  return (
    <main className='min-h-screen w-full space-y-6'>
      <TrendsCarousel />
      <CreationCarousel mediaType={MediaType.Movie} />
      <CreationCarousel mediaType={MediaType.TV} />
      <WatchlistCarousel />
      <MoviesCarousel />
      <CelebrityCarousel />
    </main>
  );
}
