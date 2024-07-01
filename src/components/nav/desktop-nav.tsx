import { Logo } from '../logo';
import { AppNav } from './app-nav';

export function DesktopNav() {
  return (
    <div className='hidden md:flex'>
      <Logo />
      <AppNav className='flex items-center space-x-6 px-6' />
    </div>
  );
}
