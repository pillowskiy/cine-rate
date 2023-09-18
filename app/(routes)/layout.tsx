import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Main from '@components/main';
import Header from '@components/header';
import Footer from '@components/footer';

import ThemeProvider from '@components/theme-provider';
import StoreProvider from '@components/store-provider';
import { Toaster } from '@components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineRate',
  description: 'CineRate: Rating, Reviews and more with IMDb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster />
        <StoreProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <div className='flex min-h-screen flex-col'>
              <Header />
              <Main>{children}</Main>
            </div>
            <Footer />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
