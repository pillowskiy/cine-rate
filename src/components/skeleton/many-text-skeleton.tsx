import { HeadingSkeleton } from './heading-skeleton';
import { TextSkeleton } from './text-skeleton';

export function ManyTextSkeleton() {
  return (
    <section>
      <HeadingSkeleton />
      <TextSkeleton blocksCount={15} />
    </section>
  );
}
