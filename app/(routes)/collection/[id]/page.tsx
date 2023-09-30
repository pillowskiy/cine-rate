import type { INextPageParams } from '@app/types/index';
import { pipe } from '@libs/common/next';
import { getCollection } from '@actions/getCollection';

import CollectionHeader from './collection-header';
import CollectionCreations from './collection-creations';
import CollectionMediaTabs from './collection-media-tabs';

export default async function CollectionPage({ params }: INextPageParams) {
  const collectionId = pipe.strToInt(params?.id);
  const { data: collection } = await getCollection(collectionId);

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CollectionHeader details={collection} />
      <CollectionCreations parts={collection.parts} />
      <CollectionMediaTabs collectionId={collection.id} />
    </main>
  );
}
