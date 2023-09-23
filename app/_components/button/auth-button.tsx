'use client';

import { useAuth } from '@redux/hooks';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@ui/button';
import { ProfileDropdown } from '@components/dropdown/profile-dropdown';
import { UserAvatar } from '@components/user-avatar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function AuthButton() {
  const { user, isLoading } = useAuth();

  /*
   * https://stackoverflow.com/questions/71706064/
   * Error when using 'typeof window' in condition
   */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (isLoading || !domLoaded) {
    return (
      <Button className='aspect-square' variant='outline' size='icon'>
        <Loader2 className='h-5 w-5 animate-spin' />
      </Button>
    );
  }

  if (user) {
    return (
      <ProfileDropdown>
        <div>
          <UserAvatar
            path={user.avatar.tmdb.avatar_path}
            gravatarHash={user.avatar.gravatar.hash}
            username={user.username}
          />
        </div>
      </ProfileDropdown>
    );
  }

  return (
    <Link href='/auth' passHref legacyBehavior>
      <Button className='aspect-square' variant='outline' size='icon'>
        <LogIn className='h-5 w-5' />
      </Button>
    </Link>
  );
}
