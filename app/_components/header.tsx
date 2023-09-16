import { Button } from '@ui/button';
import { LogIn } from 'lucide-react';
import { DesktopNav } from '@components/nav/desktop-nav';
import { MobileNav } from '@components/nav/mobile-nav';
import Link from 'next/link';
import { getSessionUser } from '@actions/getSessionUser';
import { UserAvatar } from '@components/user-avatar';
import { ProfileDropdown } from '@components/dropdown/profile-dropdown';
import { headers } from 'next/headers';
import { MOBILE_VIEW_REGEXP } from '@config/regexp';
import { SearchDialog } from './dialog/search-dialog';
import { ToggleTheme } from './toggle-theme';

export default async function Header() {
  // TEMP: use server side user store
  const user = await getSessionUser();

  const userAgent = headers().get('user-agent');
  const isMobileView: boolean = !!userAgent?.match(MOBILE_VIEW_REGEXP);

  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container flex h-14 w-full items-center justify-between gap-2'>
        {isMobileView ? <MobileNav /> : <DesktopNav />}
        <section className='flex w-full space-x-2 md:w-max'>
          <SearchDialog />
          <ToggleTheme />
          {user ? (
            <ProfileDropdown>
              <UserAvatar
                path={user.avatar.tmdb.avatar_path}
                gravatarHash={user.avatar.gravatar.hash}
                username={user.username}
              />
            </ProfileDropdown>
          ) : (
            <Link href='/auth'>
              <Button className='aspect-square' variant='outline' size='icon'>
                <LogIn className='h-5 w-5' />
              </Button>
            </Link>
          )}
        </section>
      </div>
    </header>
  );
}
