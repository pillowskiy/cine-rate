import type { CreationDetailsProps } from './common/types';
import { BaseFigure } from '@components/figure/base-figure';
import { Separator } from '@ui/separator';
import { getTitle } from './common/utils';

export default function CreationOverview({ details }: CreationDetailsProps) {
  return (
    <section>
      <div className='flex max-w-full items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>About</h2>
          <p className='text-sm text-muted-foreground'>
            {details.tagline || `About ${getTitle(details)}`}.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='flex space-x-4 sm:space-x-0'>
        <div>
          <BaseFigure
            className='block w-[120px] min-w-[120px] sm:hidden'
            posterPath={details.poster_path}
            width={320}
            height={550}
          />
        </div>
        <span className='flex-grow text-sm md:text-base'>
          {details.overview}
        </span>
      </div>
    </section>
  );
}
