import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Main from '@components/main';
import Header from '@components/header';
import Footer from '@components/footer';

import ThemeProvider from '@components/theme-provider';
import StoreProvider from '@components/store-provider';
import AuthProvider from '@components/auth-provider';
import ScrollTopProvider from '@components/scroll-top-provider';

import { Toaster } from '@components/ui/toaster';
import NoInternetConnection from '@components/no-internet-connection';
import { APP_URL } from '@libs/common/metadata';

const inter = Inter({ subsets: ['latin'] });

const keywords = [
  'Movies',
  'TV Shows',
  'Film Database',
  'Movie Ratings',
  'TV Show Ratings',
  'Film Reviews',
  'Movie Recommendations',
  'Top Rated Movies',
  'Latest Releases',
  'Actor Profiles',
  'Director Profiles',
  'Genre Search',
  'Watchlist',
  'Film History',
  'Cinephile Community',
  'Movie News',
  'TV Show Updates',
  'Hollywood',
  'IMDB Alternative',
  'TMDB Alternative',
  'Cinephile Hub',
];

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'CineRate',
  applicationName: 'CineRate',
  generator: 'Next.js',
  keywords,
  authors: [
    {
      name: 'Pillow',
      url: 'https://github.com/PillowPowa',
    },
  ],
  openGraph: {
    type: 'website',
    title: 'CineRate',
    url: APP_URL,
    description:
      '🎥 CineRate - your personal cinematic guide in the world of movies and TV shows!',
    images: APP_URL + 'og-image.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NoInternetConnection />
        <Toaster />
        <StoreProvider>
          <ScrollTopProvider>
            <AuthProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='light'
                enableSystem
              >
                <div className='flex min-h-screen flex-col'>
                  <Header />
                  <Main>{children}</Main>
                </div>
                <Footer />
              </ThemeProvider>
            </AuthProvider>
          </ScrollTopProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
