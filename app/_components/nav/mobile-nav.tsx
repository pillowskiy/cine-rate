'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';

import { Button } from '@ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '@components/logo';
import { AppNav } from '@components/nav/app-nav';
import { ToggleTheme } from '@components/toggle-theme';
import { useState } from 'react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button
          className='aspect-square'
          variant='outline'
          aria-label='menu'
          size='icon'
        >
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent className='pr-0' side='left'>
        <SheetHeader>
          <SheetTitle>
            <Logo onClick={() => setIsOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <AppNav
          className='my-4 flex flex-col space-y-2 pl-6 text-base font-normal text-foreground'
          onClick={() => setIsOpen(false)}
        />

        {/* TEMP */}
        <h2 className='text-lg font-semibold' onClick={() => setIsOpen(false)}>
          Settings
        </h2>
        <ul className='my-4 cursor-pointer space-y-2 pl-6'>
          <li>Language</li>
          <li>
            <ToggleTheme className='text-base' variant='link'>Theme</ToggleTheme>
          </li>
          <li>Privacy</li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
