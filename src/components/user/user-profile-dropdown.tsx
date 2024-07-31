'use client';

import { ReactNode, useCallback, useState } from 'react';
import Link from 'next/link';
import {
  BookmarkPlus,
  Heart,
  LogOut,
  Mails,
  MessageSquare,
  Star,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUserStore } from '#store/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#ui/dropdown-menu';
import { useToast } from '#ui/use-toast';

interface UserProfileDropdownProps {
  children: ReactNode;
}

export default function UserProfileDropdown({
  children,
}: UserProfileDropdownProps) {
  const t = useTranslations('User.UserProfileDropdown');
  const [isOpen, setIsOpen] = useState(false);
  const userStore = useUserStore();
  const { toast } = useToast();

  const closeDropdown = useCallback(() => {
    return setIsOpen(false);
  }, []);

  if (!userStore.user) return null;

  function logout() {
    userStore
      .logout()
      .then(() => {
        toast({
          title: '✅ You are logged out',
          description: 'You have successfully logged out of your account',
        });
      })
      .catch((error) => {
        toast({
          title: 'Uh, Oh! Something went wrong.',
          description: error.message || 'Unhandled error occurred!',
        });
      });

    closeDropdown();
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger className='cursor-pointer' asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>
          {userStore.user.name || userStore.user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <MessageSquare className='mr-2 size-4' />
            <span>{t('discussionsLabel')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Mails className='mr-2 size-4' />
            <span>{t('listsLabel')}</span>
          </DropdownMenuItem>
          <Link href='/account/favorite' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <Heart className='mr-2 size-4' />
              <span>{t('favoritesLabel')}</span>
            </DropdownMenuItem>
          </Link>
          <Link href='/account/rated' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <Star className='mr-2 size-4' />
              <span>{t('ratedLabel')}</span>
            </DropdownMenuItem>
          </Link>
          <Link href='/account/watchlist' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <BookmarkPlus className='mr-2 size-4' />
              <span>{t('watchlistLabel')}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 size-4' />
          <span>{t('logOutLabel')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
