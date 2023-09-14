import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';

import { Button } from '@ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '../logo';
import { AppNav } from './app-nav';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='aspect-square' variant='outline' size='icon'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>
            CineRate: Rating, Reviews and more with IMDb
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-2 text-lg'>
          <AppNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
