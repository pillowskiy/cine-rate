import type { CreationImagesResponse } from '@app/types/creation-types';
import type { BaseParams } from '@app/types/index';

import { MSeparator } from '@ui/separator';

import { Heading } from '@components/heading';
import { MediaTabs } from '@components/media-tabs';

import { $api } from '@api/api-interceptor';

interface CollectionMediaTabsProps {
  collectionId: number;
}

function getCollectionImages(collectionId: number, params?: BaseParams) {
  return $api.safeFetch<CreationImagesResponse>(
    `/collection/${collectionId}/images`,
    { params }
  );
}

export default async function CollectionMediaTabs({
  collectionId,
}: CollectionMediaTabsProps) {
  const [images] = await getCollectionImages(collectionId);

  return (
    <section>
      <Heading
        title='Collection Images'
        description="Capturing Creation's Random Moments in Pixel Perfection!"
      />
      <MSeparator className='my-4' />
      <MediaTabs images={images} />
    </section>
  );
}
