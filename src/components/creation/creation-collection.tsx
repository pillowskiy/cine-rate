import type { CollectionDetailsResponse } from '#types/collection-types';
import { $api } from '#api/api-interceptor';
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
    <CollectionArticle
      className='rounded-md border p-4'
      collection={collection}
    />
  );
}
