import Link, { type LinkProps } from 'next/link';

interface LogoProps extends Omit<LinkProps, 'href'> {};
// TEMP
export function Logo(props: LogoProps) {
  return (
    <Link href='/' className='flex items-center space-x-2 w-fit' {...props}>
      <p className='w-min rounded-md bg-primary p-2 text-sm text-primary-foreground'>
        CineRate
      </p>
    </Link>
  );
}
