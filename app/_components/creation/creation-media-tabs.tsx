import type { MediaType } from '@config/enums';
import { Carousel } from '@components/carousel';
import { ImageFromPath } from '@components/image/image-from-path';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Separator } from '@ui/separator';
import { getCreationImages } from '@actions/getCreationImages';
import { TMDB_IMAGE_URL, buildImagePath } from '@libs/tmdb';
import { cn } from '@libs/index';
import { NotFound } from '@components/not-found';
import { Heading } from '../heading';
import Link from 'next/link';

interface MediaTabsProps {
  mediaType: MediaType;
  creationId: number;
}

export default async function MediaTabs({
  creationId,
  mediaType,
}: MediaTabsProps) {
  const { data: images } = await getCreationImages(creationId, mediaType).catch(
    () => ({ data: null })
  );
  const isEmpty = !images?.backdrops.length && !images?.posters.length;

  return (
    <section>
      <Heading title='Media' description='Resources that may interest you.' />
      <Separator className='my-4' />
      {!isEmpty ? (
        <Tabs className='my-2' defaultValue={images?.backdrops.length ? 'backdrops' : 'posters'}>
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
                <div className='relative' key={image.file_path}>
                  <div className='aspect-[16/9] h-[150px] overflow-hidden rounded-md lg:h-[300px]'>
                    <ImageFromPath
                      className='h-full w-auto object-cover'
                      src={buildImagePath({
                        path: image.file_path,
                        scale: 'backdrop',
                      })}
                      alt={`Image #${index}`}
                      width={720}
                      height={480}
                    />
                  </div>
                  <Link
                    className='absolute bottom-2 left-2 text-foreground/70 transition-all hover:text-foreground hover:underline text-xs'
                    href={TMDB_IMAGE_URL + 'original' + image.file_path}
                    target='_blank'
                  >
                    Open original (high resolution)
                  </Link>
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
                    src={buildImagePath({
                      path: image.file_path,
                      scale: 'poster',
                    })}
                    alt={`Image #${index}`}
                    width={260}
                    height={390}
                  />
                </div>
              ))}
            </Carousel>
          </TabsContent>
        </Tabs>
      ) : (
        <NotFound />
      )}
    </section>
  );
}
