import type { CollectionDetailsResponse } from '@app/types/collection-types';
import { MSeparator } from '@ui/separator';
import { Heading } from '@components/heading';
import { $api } from '@/app/_shared/api/api-interceptor';
import { CollectionArticle } from '../article/collection-article';

interface CreationCollectionProps {
  collectionId: number;
}

async function getCollection(collectionId: number) {
  return $api.safeFetch<CollectionDetailsResponse>(
    `/collection/${collectionId}`
  );
}

export default async function CreationCollection({
  collectionId,
}: CreationCollectionProps) {
  const [collection, error] = await getCollection(collectionId);

  if (error) return null;

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
