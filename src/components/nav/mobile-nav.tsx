'use client';

import { useState } from 'react';
import { Check, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#ui/accordion';
import { Button } from '#ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#ui/sheet';
import { Logo } from '#components/logo';
import { AppNav } from '#components/nav/app-nav';
import { cn } from '#libs/index';

const themes = [
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button
          className='aspect-square'
          variant='outline'
          aria-label='menu'
          size='icon'
        >
          <Menu className='size-5' />
        </Button>
      </SheetTrigger>
      <SheetContent className='pr-0' side='left'>
        <SheetHeader>
          <SheetTitle>
            <Logo onClick={() => setIsOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <AppNav
          className='text-foreground my-4 flex flex-col space-y-2 pl-6 text-base font-normal'
          onClick={() => setIsOpen(false)}
        />

        <Accordion type='multiple'>
          <AccordionItem className='border-b-0' value='language'>
            <AccordionTrigger className='pr-4 pt-0'>Language</AccordionTrigger>
            <AccordionContent asChild>
              <ul className='text-foreground/70 columns-1 space-y-2 pl-6 text-base [&>*]:w-fit'>
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
              <div className='text-foreground/70 space-y-2 pl-6 text-base'>
                {themes.map(({ value, label }) => (
                  <button
                    className={cn(
                      'relative flex w-full items-center',
                      theme === value && 'text-foreground'
                    )}
                    key={value}
                    onClick={() => setTheme(value)}
                  >
                    {theme === value && (
                      <Check className='absolute -left-1.5 size-4 -translate-x-full' />
                    )}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className='border-b-0' value='privacy'>
            <AccordionTrigger className='pr-4 pt-0'>Privacy</AccordionTrigger>
            <AccordionContent asChild>
              <ul className='text-foreground/70 space-y-2 pl-6 text-base'>
                <li>Cookies</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
