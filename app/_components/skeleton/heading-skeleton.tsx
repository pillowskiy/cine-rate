import { Separator } from '@ui/separator';
import { Skeleton } from '@ui/skeleton';
import { getRandomWidth } from './common/utils';
import { TextSkeleton } from './text-skeleton';

export function HeadingSkeleton() {
  return (
    <>
      <div className='h-fit space-y-2'>
        <Skeleton
          className='h-6 w-[60%] sm:h-8 sm:w-[220px]'
          style={{ minWidth: getRandomWidth(60) }}
        />
        <TextSkeleton
          className='flex-nowrap overflow-hidden sm:max-w-[70%]'
          blocksCount={3}
        />
      </div>
      <Separator className='my-4' />
    </>
  );
}
