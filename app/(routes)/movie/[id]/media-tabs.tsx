import Image from 'next/image';
import { CreationVideoSite, MediaType } from '@app/types/index';
import { YoutubePlayer } from '@components/youtube-player';
import { Carousel } from '@components/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Separator } from '@ui/separator';
import { getCreationImages } from '@/app/_shared/actions/getCreationImages';
import { getCreationVideos } from '@/app/_shared/actions/getCreationVideos';
import { buildURL } from '@libs/ytdl';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '@libs/index';

interface MediaTabsProps {
  creationId: number;
}

export default async function MediaTabs({ creationId }: MediaTabsProps) {
  const { data: videos } = await getCreationVideos(creationId, MediaType.Movie);
  const { data: images } = await getCreationImages(creationId, MediaType.Movie);

  if (!videos) return null;

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
          <TabsTrigger value='videos'>Videos</TabsTrigger>
          <TabsTrigger value='backdrops' disabled={!images?.backdrops.length}>
            Backdrops
          </TabsTrigger>
          <TabsTrigger value='posters' disabled={!images?.posters.length}>
            Posters
          </TabsTrigger>
        </TabsList>
        <TabsContent value='videos'>
          <Carousel>
            {videos.results.map(
              (video) =>
                video.site === CreationVideoSite.YOUTUBE && (
                  <YoutubePlayer
                    className='aspect-[16/8] h-[150px] md:h-[300px]'
                    key={video.id}
                    url={buildURL(video.key)}
                  />
                )
            )}
          </Carousel>
        </TabsContent>
        <TabsContent value='backdrops'>
          <Carousel>
            {images.backdrops.slice(0, 20).map((image, index) => (
              <div
                className={cn(
                  'aspect-[16/9] h-[150px] overflow-hidden rounded-md md:h-[300px]'
                )}
                key={image.file_path}
              >
                <Image
                  className='h-full w-auto object-cover'
                  src={buildImagePath(image.file_path)}
                  alt={`Image #${index}`}
                  width={image.width}
                  height={image.height}
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
                <Image
                  className='h-full w-auto object-cover'
                  src={buildImagePath(image.file_path)}
                  alt={`Image #${index}`}
                  width={image.width}
                  height={image.height}
                />
              </div>
            ))}
          </Carousel>
        </TabsContent>
      </Tabs>
    </section>
  );
}
