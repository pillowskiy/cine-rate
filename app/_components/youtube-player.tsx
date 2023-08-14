'use client';

import Youtube, { YouTubeProps } from 'react-youtube';
import { cn } from '../_libs';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

interface YoutubePlayerProps extends ReactPlayerProps {
  url: string;
  className?: string;
}

export function YoutubePlayer({
  url,
  className,
  ...props
}: YoutubePlayerProps) {
  return (
    <figure
      className={cn(
        'h-[150px] w-[250px] overflow-hidden rounded-md',
        className
      )}
    >
      <ReactPlayer
        url={url}
        className='pointer-events-none h-[200px]'
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              disablekb: 1,
              controls: 0,
              autoplay: 1,
              iv_load_policy: 3,
              cc_load_policy: 1,
              fs: 0,
              showinfo: 0,
              showsearch: 0,
              rel: 1,
            },
          },
        }}
        width='100%'
        height='100%'
        playing
        {...props}
      />
    </figure>
  );
}
