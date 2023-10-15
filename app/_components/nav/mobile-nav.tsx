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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

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

        <Accordion type='multiple'>
          <AccordionItem className='border-b-0' value='language'>
            <AccordionTrigger className='pr-4 pt-0'>Language</AccordionTrigger>
            <AccordionContent asChild>
              <ul className='space-y-2 pl-6 text-base text-foreground/70'>
                <li>English</li>
                <li>Ukrainian</li>
                <li>Polland</li>
                <li>Meow-Maw-Miw</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className='border-b-0' value='theme'>
            <AccordionTrigger className='pr-4 pt-0'>Theme</AccordionTrigger>
            <AccordionContent asChild>
              <ul className='space-y-2 pl-6 text-base text-foreground/70'>
                <li>Dark</li>
                <li>White</li>
                <li>System</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className='border-b-0' value='privacy'>
            <AccordionTrigger className='pr-4 pt-0'>Privacy</AccordionTrigger>
            <AccordionContent asChild>
              <ul className='space-y-2 pl-6 text-base text-foreground/70'>
                <li>Cookies</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
