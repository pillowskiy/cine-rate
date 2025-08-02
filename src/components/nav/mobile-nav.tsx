'use client';

import { useState } from 'react';
import { Check, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

const themes = ['light', 'dark'] as const;

function getThemeTranslationKey<T extends (typeof themes)[number]>(
  theme: T
): `themes.${T}` {
  return `themes.${theme}`;
}

export function MobileNav() {
  const t = useTranslations('Nav.MobileNav');
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
            <AccordionTrigger className='pr-4 pt-0'>
              {t('languagesLabel')}
            </AccordionTrigger>
            <AccordionContent asChild>
              <ul className='text-foreground/70 columns-1 space-y-2 pl-6 text-base *:w-fit'>
                <li>English</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className='border-b-0' value='theme'>
            <AccordionTrigger className='pr-4 pt-0'>
              {t('themeLabel')}
            </AccordionTrigger>
            <AccordionContent asChild>
              <div className='text-foreground/70 space-y-2 pl-6 text-base'>
                {themes.map((theme) => (
                  <button
                    className={cn(
                      'relative flex w-full items-center',
                      theme === theme && 'text-foreground'
                    )}
                    key={theme}
                    onClick={() => setTheme(theme)}
                  >
                    {theme === theme && (
                      <Check className='absolute -left-1.5 size-4 -translate-x-full' />
                    )}
                    <span>{t(getThemeTranslationKey(theme))}</span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className='border-b-0' value='privacy'>
            <AccordionTrigger className='pr-4 pt-0'>
              {t('privacyLabel')}
            </AccordionTrigger>
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
