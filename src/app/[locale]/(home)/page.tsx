import { unstable_setRequestLocale } from 'next-intl/server';
import { AppPageParams } from '#types/index';
import { locales } from '#config/localization';
import CelebrityCarousel from './celebrity-carousel';
import MoviesCarousel from './movies-carousel';
import SeriesCarousel from './series-carousel';
import TrendsCarousel from './trends-carousel';
import WatchlistCarousel from './watchlist-carousel';

export const dynamic = 'force-static';
export const revalidate = 3600 * 24;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: AppPageParams) {
  unstable_setRequestLocale(params.locale);

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
