import { Moon, Sun } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { DesktopNav } from '#components/nav/desktop-nav';
import { MobileNav } from '#components/nav/mobile-nav';
import { AuthButton } from '#components/user/auth-button';
import { isMobileView } from '#libs/common/views';
import { SearchDialog } from './dialog/search-dialog';
import { Logo } from './logo';
import { ToggleTheme } from './toggle-theme';

export default async function Header() {
  const t = await getTranslations('Header');
  const isMobile = await isMobileView();

  return (
    <header className='supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur-sm'>
      <div className='container flex h-14 w-full items-center justify-between gap-2'>
        {isMobile ? (
          <div className='flex gap-2'>
            <MobileNav />
            <Logo />
          </div>
        ) : (
          <DesktopNav />
        )}
        <section className='flex w-full justify-end space-x-2 md:w-max'>
          <SearchDialog />
          {!isMobile && (
            <ToggleTheme className='aspect-square'>
              <Sun className='size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>{t('toggleTheme')}</span>
            </ToggleTheme>
          )}
          <AuthButton />
        </section>
      </div>
    </header>
  );
}
