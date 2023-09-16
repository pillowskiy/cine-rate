'use client';

import { Button } from '@ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className='aspect-square'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      variant='outline'
      size='icon'
    >
      <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
