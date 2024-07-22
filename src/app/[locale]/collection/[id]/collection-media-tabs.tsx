import type { CreationImagesResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import { MediaTabs } from '#components/media-tabs';
import { $api } from '#api/api-interceptor';

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

  return <MediaTabs images={images} />;
}
