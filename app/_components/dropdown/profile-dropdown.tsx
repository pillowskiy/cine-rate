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
import { useToast } from '@ui/use-toast';

import { MessageSquare, Mails, Star, BookmarkPlus, LogOut } from 'lucide-react';
import { useAppDispatch, useAuth } from '@redux/hooks';
import { logout as logoutAction } from '@redux/user/user-actions';

interface ProfileDropdownProps {
  children: ReactNode;
}

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

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
        title: result.error.message || 'Uh, Oh! Something went wrong.',
        description: getStatusDescription(result.payload?.status || 500),
      });
    }
  }

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
        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log Out</span>
          <DropdownMenuShortcut>⇧+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function getStatusDescription(arg0: number): ReactNode {
  throw new Error('Function not implemented.');
}
