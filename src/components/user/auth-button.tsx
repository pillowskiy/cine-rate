'use client';

import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useClientReady } from '#hooks/useClientReady';
import { useUserStore } from '#store/user';
import { Button } from '#ui/button';
import UserAvatar from './user-avatar';
import UserProfileDropdown from './user-profile-dropdown';

export function AuthButton() {
  const user = useUserStore((state) => state.user);
  const isClientReady = useClientReady();

  if (!isClientReady) {
    return <div className='size-10 animate-pulse rounded-full bg-secondary' />;
  }

  if (!user) {
    return (
      <Button
        className='aspect-square'
        variant='outline'
        aria-label='log in'
        size='icon'
        asChild
      >
        <Link href='/auth'>
          <LogIn className='size-5' />
        </Link>
      </Button>
    );
  }

  return (
    <UserProfileDropdown>
      <button className='rounded-full' aria-label='Profile Dropdown'>
        <UserAvatar
          path={user.avatar.tmdb.avatar_path}
          gravatarHash={user.avatar.gravatar.hash}
          username={user.username}
        />
      </button>
    </UserProfileDropdown>
  );
}
