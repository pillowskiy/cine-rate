import { CreationArticle } from '@/app/_components/article/creation-article';
import { Carousel } from '@/app/_components/carousel';
import { Heading } from '@/app/_components/heading';
import { NotFound } from '@/app/_components/not-found';
import { Separator } from '@/app/_components/ui/separator';
import { IDetailedCollection } from '@/app/_types/collection-types';

interface CollectionCreationsProps {
  parts: IDetailedCollection['parts'];
}

export default async function CollectionCreations({
  parts,
}: CollectionCreationsProps) {
  return (
    <section>
      <Heading
        title='Collection Creations'
        description='Where Clutter Becomes Art!'
      />
      <Separator className='my-4' />

      {!!parts.length ? (
        <Carousel>
          {parts.map((creation) => (
            <CreationArticle
              aspect='horizontal'
              key={creation.id}
              creation={creation}
              className='w-[260px]'
              size='sm'
              width={260}
              height={140}
            />
          ))}
        </Carousel>
      ) : (
        <NotFound />
      )}
    </section>
  );
}
