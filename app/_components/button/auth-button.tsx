'use client';

import { useAuth } from '@redux/hooks';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@ui/button';
import { ProfileDropdown } from '@components/dropdown/profile-dropdown';
import { UserAvatar } from '@components/user-avatar';
import { useClientReady } from '@hooks/useClientReady';
import Link from 'next/link';

export function AuthButton() {
  const { user, isLoading } = useAuth();
  const isClientReady = useClientReady();

  if (isLoading || !isClientReady) {
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
