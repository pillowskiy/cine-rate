import { DesktopNav } from '@components/nav/desktop-nav';
import { MobileNav } from '@components/nav/mobile-nav';
import { headers } from 'next/headers';
import { MOBILE_VIEW_REGEXP } from '@config/regexp';
import { SearchDialog } from './dialog/search-dialog';
import { ToggleTheme } from './toggle-theme';
import { AuthButton } from './button/auth-button';
import { Logo } from './logo';

export default function Header() {
  const userAgent = headers().get('user-agent');
  const isMobileView: boolean = !!userAgent?.match(MOBILE_VIEW_REGEXP);

  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container flex h-14 w-full items-center justify-between gap-2'>
        {isMobileView ? (
          <div className='flex gap-2'>
            <MobileNav />
            <Logo />
          </div>
        ) : (
          <DesktopNav />
        )}
        <section className='flex w-full space-x-2 sm:w-max justify-end'>
          <SearchDialog />
          { !isMobileView && <ToggleTheme /> }
          <AuthButton />
        </section>
      </div>
    </header>
  );
}
