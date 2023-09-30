import type { BaseParams } from '@app/types/index';
import type { CreationImagesResponse } from '@app/types/creation-types';
import { Heading } from '@components/heading';
import { MediaTabs } from '@components/media-tabs';
import { Separator } from '@ui/separator';
import { $api } from '@/app/_shared/api/api-interceptor';

interface CollectionMediaTabsProps {
  collectionId: number;
}

function getCollectionImages(collectionId: number, params?: BaseParams) {
  return $api.get<CreationImagesResponse>(
    `/3/collection/${collectionId}/images`,
    { params }
  );
}

export default async function CollectionMediaTabs({
  collectionId,
}: CollectionMediaTabsProps) {
  const { data: images } = await getCollectionImages(collectionId).catch(
    () => ({
      data: null,
    })
  );

  return (
    <section>
      <Heading
        title='Collection Images'
        description="Capturing Creation's Random Moments in Pixel Perfection!"
      />
      <Separator className='my-4' />
      <MediaTabs images={images} />
    </section>
  );
}
