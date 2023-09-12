import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t py-6'>
      <div className='container space-y-4'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-semibold'>Made with</span>
          <Link href='https://nextjs.org/'>
            <Image src='next.svg' alt='Next Logo' width={96} height={96} />
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-semibold'>Data provided by</span>
          <Link href='https://www.themoviedb.org/'>
            <Image
              src='/tmdb-logo.svg'
              alt='TMDB Logo'
              width={96}
              height={96}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
