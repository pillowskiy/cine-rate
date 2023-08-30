import { Button } from '@ui/button';
import { SearchInput } from '@ui/search-input';
import { BookmarkPlus, LogIn } from 'lucide-react';
import { DesktopNav } from '@components/nav/desktop-nav';
import Link from 'next/link';
import { getSessionUser } from '@actions/getSessionUser';
import { UserAvatar } from './user-avatar';
import { ProfileDropdown } from './dropdown/profile-dropdown';

export default async function Header() {
  // TEMP: use server side user store
  const user = await getSessionUser();

  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container flex h-14 items-center justify-between'>
        <DesktopNav />
        <section className='flex space-x-2'>
          <SearchInput />
          <Button variant='outline' size='icon'>
            <BookmarkPlus className='h-5 w-5' />
          </Button>
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
              <Button variant='outline' size='icon'>
                <LogIn className='h-5 w-5' />
              </Button>
            </Link>
          )}
        </section>
      </div>
    </header>
  );
}
