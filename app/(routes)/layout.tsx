import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Main from '@components/main';
import Header from '@components/header';
import Footer from '@components/footer';

import ThemeProvider from '@components/theme-provider';
import StoreProvider from '@components/store-provider';

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
        <StoreProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <div className='min-h-screen flex flex-col'>
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
