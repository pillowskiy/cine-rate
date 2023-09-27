import type { MediaType } from '@config/enums';
import { Carousel } from '@components/carousel';
import { ImageFromPath } from '@components/image/image-from-path';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Separator } from '@ui/separator';
import { getCreationImages } from '@actions/getCreationImages';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '@libs/index';

interface MediaTabsProps {
  mediaType: MediaType;
  creationId: number;
}

export default async function MediaTabs({ creationId, mediaType }: MediaTabsProps) {
  const { data: images } = await getCreationImages(creationId, mediaType);

  if (!images) return null;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Media</h2>
          <p className='text-sm text-muted-foreground'>
            Resources that may interest you.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <Tabs className='my-2' defaultValue='backdrops'>
        <TabsList>
          <TabsTrigger value='backdrops' disabled={!images?.backdrops.length}>
            Backdrops
          </TabsTrigger>
          <TabsTrigger value='posters' disabled={!images?.posters.length}>
            Posters
          </TabsTrigger>
        </TabsList>
        <TabsContent value='backdrops'>
          <Carousel>
            {images.backdrops.slice(0, 20).map((image, index) => (
              <div
                className={cn(
                  'aspect-[16/9] h-[150px] overflow-hidden rounded-md lg:h-[300px]'
                )}
                key={image.file_path}
              >
                <ImageFromPath
                  className='h-full w-auto object-cover'
                  src={buildImagePath({ path: image.file_path, scale: 'backdrop' })}
                  alt={`Image #${index}`}
                  width={720}
                  height={480}
                />
              </div>
            ))}
          </Carousel>
        </TabsContent>
        <TabsContent value='posters'>
          <Carousel>
            {images.posters.slice(0, 20).map((image, index) => (
              <div
                className='aspect-[2/3] h-[150px] overflow-hidden rounded-md md:h-[300px]'
                key={image.file_path}
              >
                <ImageFromPath
                  className='h-full w-auto object-cover'
                  src={buildImagePath({ path: image.file_path, scale: 'poster' })}
                  alt={`Image #${index}`}
                  width={260}
                  height={390}
                />
              </div>
            ))}
          </Carousel>
        </TabsContent>
      </Tabs>
    </section>
  );
}
