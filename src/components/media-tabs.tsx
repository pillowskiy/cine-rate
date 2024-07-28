import { useTranslations } from 'next-intl';
import type { CreationImagesResponse } from '#types/creation-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs';
import { Carousel } from '#components/carousel';
import { ImageFromPath } from '#components/image/image-from-path';
import { NotFound } from '#components/not-found';
import { buildImagePath } from '#libs/tmdb';
import { OpenOriginalImage } from './open-original-image';

interface MediaTabsProps {
  images: CreationImagesResponse | null;
}

export function MediaTabs({ images }: MediaTabsProps) {
  const t = useTranslations('resourceImagesType');

  const isEmpty = !images?.backdrops.length && !images?.posters.length;
  if (isEmpty) {
    return <NotFound />;
  }

  return (
    <Tabs
      className='my-2'
      defaultValue={images?.backdrops.length ? 'backdrops' : 'posters'}
    >
      <TabsList>
        <TabsTrigger value='backdrops' disabled={!images?.backdrops.length}>
          {t('backdrops')}
        </TabsTrigger>
        <TabsTrigger value='posters' disabled={!images?.posters.length}>
          {t('posters')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='backdrops'>
        <Carousel>
          {images.backdrops.slice(0, 20).map((image, index) => (
            <div key={image.file_path}>
              <div className='aspect-[16/9] h-[150px] overflow-hidden rounded-md md:h-[300px]'>
                <ImageFromPath
                  className='h-full w-auto object-cover'
                  src={buildImagePath({
                    path: image.file_path,
                    scale: 'backdrop',
                  })}
                  alt={`Image #${index}`}
                  width={540}
                  height={300}
                  loading='lazy'
                  sizes='(min-width: 768px) 540px, 270px'
                  quality={100}
                />
              </div>
              <OpenOriginalImage path={image.file_path} />
            </div>
          ))}
        </Carousel>
      </TabsContent>
      <TabsContent value='posters'>
        <Carousel>
          {images.posters.slice(0, 20).map((image, index) => (
            <div key={image.file_path}>
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
                  width={200}
                  height={300}
                  loading='lazy'
                  sizes='(min-width: 768px) 200px, 150px'
                />
              </div>
              <OpenOriginalImage path={image.file_path} />
            </div>
          ))}
        </Carousel>
      </TabsContent>
    </Tabs>
  );
}
