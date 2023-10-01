import type { CollectionDetailsResponse } from '@app/types/collection-types';
import { $api } from '@/app/_shared/api/api-interceptor';
import { Heading } from '@components/heading';
import { MSeparator } from '@ui/separator';
import { CollectionArticle } from '../article/collection-article';

interface CreationCollectionProps {
  collectionId: number;
}

async function getCollection(collectionId: number) {
  return $api
    .get<CollectionDetailsResponse>(`/3/collection/${collectionId}`)
    .catch((e) => {
      console.log(e.response);
      return { data: null };
    });
}

export default async function CreationCollection({
  collectionId,
}: CreationCollectionProps) {
  const { data: collection } = await getCollection(collectionId);

  if (!collection) return null;

  return (
    <section>
      <Heading
        title='Creation Collection'
        description='The Ultimate Showcase of Unintentional Accumulation!'
      />
      <MSeparator className='my-4' />

      <CollectionArticle
        className='rounded-md border p-4'
        collection={collection}
      />
    </section>
  );
}
