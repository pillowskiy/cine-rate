import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppPageParams } from '#types/index';
import { Toaster } from '#ui/toaster';
import Footer from '#components/footer';
import Header from '#components/header';
import Main from '#components/main';
import NoInternetConnection from '#components/no-internet-connection';
import ServeSiteProviders from '#providers/index';
import { APP_URL } from '#libs/common/metadata';
import '../globals.css';

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
  themeColor: '#ffffff',
  metadataBase: new URL(APP_URL),
  title: 'CineRate',
  description:
    '🎥 CineRate - your personal cinematic guide in the world of movies and TV shows!',
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
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & AppPageParams) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NoInternetConnection />
          <Toaster />
          <ServeSiteProviders>
            <div className='flex min-h-screen flex-col'>
              <Header />
              <Main>{children}</Main>
            </div>
            <Footer />
          </ServeSiteProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
