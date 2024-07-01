import { IDetailedCollection } from '#types/collection-types';
import { MSeparator } from '#ui/separator';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { Heading } from '#components/heading';
import { NotFound } from '#components/not-found';

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
      <MSeparator className='my-4' />

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
