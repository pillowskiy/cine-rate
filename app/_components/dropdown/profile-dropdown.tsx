'use client';

import type { ReactNode } from 'react';
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

import { MessageSquare, Mails, Star, BookmarkPlus, LogOut } from 'lucide-react';

import { useAppSelector } from '@/app/_redux/hooks';

interface ProfileDropdownProps {
  children: ReactNode;
}

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const { user } = useAppSelector((state) => state.user);

  // TEMP
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer' asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>{user.name || user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <MessageSquare className='mr-2 h-4 w-4' />
            <span>Discussions</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mails className='mr-2 h-4 w-4' />
            <span>Lists</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star className='mr-2 h-4 w-4' />
            <span>Rating</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookmarkPlus className='mr-2 h-4 w-4' />
            <span>Watch List</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log Out</span>
          <DropdownMenuShortcut>⇧+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
