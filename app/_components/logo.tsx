import Link, { type LinkProps } from 'next/link';

interface LogoProps extends Omit<LinkProps, 'href'> {}
// TEMP
export function Logo(props: LogoProps) {
  return (
    <Link href='/' className='flex w-fit items-center space-x-2' {...props}>
      <p className='bg-primary text-primary-foreground w-min rounded-md p-2 text-sm'>
        CineRate
      </p>
    </Link>
  );
}
