import { buildURL } from '@/app/_libs/ytdl';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '../ui/hover-card';
import { YoutubePlayer } from '../youtube-player';
import { CreationCardProps, CreationCard } from './creation-card';
import { getVideos } from '@/app/_shared/actions/getVideos';
import { CreationVideoSite } from '@app/types/index';

interface CreationHoverCardProps extends CreationCardProps {}
export async function CreationHoverCard(props: CreationHoverCardProps) {
  const { data: videos } = await getVideos(props.creation.id);
  if (!videos?.results.length) return null;
  const youtubeVideos = videos.results.filter(
    (video) => video.site === CreationVideoSite.YOUTUBE
  );
  const video =
    youtubeVideos.find((video) => video.official && video.type === 'Trailer') ||
    youtubeVideos[0];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <CreationCard {...props} />
      </HoverCardTrigger>
      <HoverCardContent className='w-fit'>
        <YoutubePlayer url={buildURL(video.key)} />
      </HoverCardContent>
    </HoverCard>
  );
}
