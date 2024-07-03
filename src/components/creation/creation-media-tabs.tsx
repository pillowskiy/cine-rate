import { getCreationImages } from '#actions/getCreationImages';
import type { MediaType } from '#config/enums';
import { MediaTabs } from '#components/media-tabs';

interface MediaTabsProps {
  mediaType: MediaType;
  creationId: number;
}

export default async function CreationMediaTabs({
  creationId,
  mediaType,
}: MediaTabsProps) {
  const [images, error] = await getCreationImages(creationId, mediaType);

  if (error) return null;

  return <MediaTabs images={images} />;
}
