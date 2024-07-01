'use client';

import Link from 'next/link';

import { useAuth } from '@redux/hooks';
import { Loader2, LogIn } from 'lucide-react';

import { useClientReady } from '@hooks/useClientReady';

import { Button } from '@ui/button';

import { ProfileDropdown } from '@components/dropdown/profile-dropdown';
import { UserAvatar } from '@components/user-avatar';

export function AuthButton() {
  const { user, isLoading } = useAuth();
  const isClientReady = useClientReady();

  if (isLoading || !isClientReady) {
    return (
      <Button
        className='aspect-square'
        variant='outline'
        size='icon'
        aria-label='log in'
        disabled
      >
        <Loader2 className='size-5 animate-spin will-change-transform' />
      </Button>
    );
  }

  if (user) {
    return (
      <ProfileDropdown>
        <button className='rounded-full' aria-label='Profile Dropdown'>
          <UserAvatar
            path={user.avatar.tmdb.avatar_path}
            gravatarHash={user.avatar.gravatar.hash}
            username={user.username}
          />
        </button>
      </ProfileDropdown>
    );
  }

  return (
    <Link href='/auth' passHref legacyBehavior>
      <Button
        className='aspect-square'
        variant='outline'
        aria-label='log in'
        size='icon'
      >
        <LogIn className='size-5' />
      </Button>
    </Link>
  );
}
