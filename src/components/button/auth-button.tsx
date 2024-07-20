'use client';

import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useClientReady } from '#hooks/useClientReady';
import { useUserStore } from '#store/user';
import { Button } from '#ui/button';
import { ProfileDropdown } from '#components/dropdown/profile-dropdown';
import { UserAvatar } from '#components/user-avatar';

export function AuthButton() {
  const user = useUserStore((state) => state.user);
  const isClientReady = useClientReady();

  if (!isClientReady) {
    return <div className='size-10 rounded-full bg-secondary animate-pulse' />;
  }

  if (!user) {
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
