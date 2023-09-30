import type { MediaType } from '@config/enums';
import { Carousel } from '@components/carousel';
import { ImageFromPath } from '@components/image/image-from-path';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Separator } from '@ui/separator';
import { getCreationImages } from '@actions/getCreationImages';
import { TMDB_IMAGE_URL, buildImagePath } from '@libs/tmdb';
import { NotFound } from '@components/not-found';
import { Heading } from '../heading';
import Link from 'next/link';
import { MediaTabs } from '../media-tabs';

interface MediaTabsProps {
  mediaType: MediaType;
  creationId: number;
}

export default async function CreationMediaTabs({
  creationId,
  mediaType,
}: MediaTabsProps) {
  const { data: images } = await getCreationImages(creationId, mediaType).catch(
    () => ({ data: null })
  );

  return (
    <section>
      <Heading title='Media' description='Resources that may interest you.' />
      <Separator className='my-4' />
      <MediaTabs images={images} />
    </section>
  );
}
