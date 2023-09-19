import { Logo } from '../logo';
import { AppNav } from './app-nav';

export function DesktopNav() {
  return (
    <div className='mr-4 hidden md:flex'>
      <Logo />
      <AppNav className='flex items-center space-x-6' />
    </div>
  );
}
