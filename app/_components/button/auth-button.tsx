'use client';

import { useAppSelector } from '@/app/_redux/hooks';
import { LogIn } from 'lucide-react';
import { ProfileDropdown } from '../dropdown/profile-dropdown';
import { Button } from '../ui/button';
import { UserAvatar } from '../user-avatar';
import Link from 'next/link';

export function AuthButton() {
  const { user } = useAppSelector((state) => state.user);

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
