'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';

import { Button } from '@ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '@components/logo';
import { AppNav } from '@components/nav/app-nav';
import { useState } from 'react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button className='aspect-square' variant='outline' size='icon'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent className='pr-0' side='left'>
        <SheetHeader>
          <SheetTitle>
            <Logo />
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
        <ul className='my-4 space-y-2 pl-6 crusor-pointer'>
          <li>Language</li>
          <li>Theme</li>
          <li>Privacy</li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
