import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { getImages } from '@actions/getImages';
import { getVideos } from '@actions/getVideos';
import { CreationVideoSite } from '@app/types/index';
import { Carousel } from '@components/carousel';
import { YoutubePlayer } from '@components/youtube-player';
import { buildURL } from '@libs/ytdl';
import { buildImagePath } from '@libs/tmdb';
import Image from 'next/image';
import { cn } from '@/app/_libs';

interface MediaTabsProps {
  mediaType: 'movie' | 'tv' | 'person';
  creationId: number;
}

export async function MediaTabs({ mediaType, creationId }: MediaTabsProps) {
  const { data: videos } = await getVideos(creationId);
  const { data: images } = await getImages(mediaType, creationId);

  if (!videos) return null;

  return (
    <section>
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
                className={cn('overflow-hidden rounded-md h-[150px] md:h-[300px] aspect-[16/9]')}
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
              <div className='overflow-hidden rounded-md h-[150px] md:h-[300px] aspect-[2/3]' key={image.file_path}>
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
