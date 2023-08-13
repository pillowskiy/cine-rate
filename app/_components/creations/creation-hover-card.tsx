import { HoverCard, HoverCardTrigger, HoverCardContent } from '../ui/hover-card';
import { CreationCardProps, CreationCard } from './creation-card';
import Image from 'next/image';
import { buildImagePath } from '@/app/_libs/tmdb';

interface CreationHoverCardProps extends CreationCardProps {}

export function CreationHoverCard(props: CreationHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <CreationCard {...props} />
      </HoverCardTrigger>
      <HoverCardContent>
        <Image
          src={buildImagePath(props.creation.poster_path)}
          alt='Creation Poster'
          width={480}
          height={720}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
