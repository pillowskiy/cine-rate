import {
  Sheet,
  SheetContent,
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
        </SheetHeader>
        <AppNav className='my-4 flex flex-col space-y-2 pl-6 text-base' />
      </SheetContent>
    </Sheet>
  );
}
