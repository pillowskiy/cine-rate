import { IDetailedCollection } from '#types/collection-types';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';

interface CollectionCreationsProps {
  parts: IDetailedCollection['parts'];
}

export default function CollectionCreations({
  parts,
}: CollectionCreationsProps) {
  if (!parts.length) {
    return <NotFound />;
  }

  return (
    <Carousel>
      {parts.map((creation) => (
        <CreationArticle
          aspect='horizontal'
          key={creation.id}
          creation={creation}
          className='w-[260px]'
          width={260}
          height={140}
        />
      ))}
    </Carousel>
  );
}
