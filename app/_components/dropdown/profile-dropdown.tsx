'use client';

import { type ReactNode, useCallback, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAuth } from '@redux/hooks';
import { logout as logoutAction } from '@redux/user/user-actions';
import {
  BookmarkPlus,
  Heart,
  LogOut,
  Mails,
  MessageSquare,
  Star,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { useToast } from '@ui/use-toast';

interface ProfileDropdownProps {
  children: ReactNode;
}

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const closeDropdown = useCallback(() => {
    return setIsOpen(false);
  }, []);

  if (!user) return null;

  async function logout() {
    const result = await dispatch(logoutAction());

    if (logoutAction.fulfilled.match(result)) {
      toast({
        title: '✅ You are logged out',
        description: 'You have successfully logged out of your account',
      });
    } else {
      toast({
        title: 'Uh, Oh! Something went wrong.',
        description: result.error.message || 'Unhandled error occurred!',
      });
    }

    closeDropdown();
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger className='cursor-pointer' asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>{user.name || user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <MessageSquare className='mr-2 size-4' />
            <span>Discussions</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Mails className='mr-2 size-4' />
            <span>Lists</span>
          </DropdownMenuItem>
          <Link href='/account/favorite' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <Heart className='mr-2 size-4' />
              <span>Favorite</span>
            </DropdownMenuItem>
          </Link>
          <Link href='/account/rated' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <Star className='mr-2 size-4' />
              <span>Rated</span>
            </DropdownMenuItem>
          </Link>
          <Link href='/account/watchlist' passHref legacyBehavior>
            <DropdownMenuItem
              onClick={closeDropdown}
              className='cursor-pointer'
            >
              <BookmarkPlus className='mr-2 size-4' />
              <span>Watch List</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 size-4' />
          <span>Log Out</span>
          <DropdownMenuShortcut>⇧+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
