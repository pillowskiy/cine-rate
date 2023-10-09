import { DesktopNav } from '@components/nav/desktop-nav';
import { MobileNav } from '@components/nav/mobile-nav';
import { isMobileView } from '@libs/common/views';
import { SearchDialog } from './dialog/search-dialog';
import { ToggleTheme } from './toggle-theme';
import { AuthButton } from './button/auth-button';
import { Logo } from './logo';

export default function Header() {
  const isMobile = isMobileView();

  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container flex h-14 w-full items-center justify-between gap-2'>
        {isMobile ? (
          <div className='flex gap-2'>
            <MobileNav />
            <Logo />
          </div>
        ) : (
          <DesktopNav />
        )}
        <section className='flex w-full space-x-2 md:w-max justify-end'>
          <SearchDialog />
          { !isMobile && <ToggleTheme /> }
          <AuthButton />
        </section>
      </div>
    </header>
  );
}
