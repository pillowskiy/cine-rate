'use client';

import { useState } from 'react';
import { cn } from '../_libs';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { VolumeX, Volume2, Youtube, Play, Divide } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

interface YoutubePlayerProps extends ReactPlayerProps {
  url: string;
  className?: string;
}

export function YoutubePlayer({
  url,
  className,
  ...props
}: YoutubePlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <figure
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-md',
        className
      )}
    >
      <div className='absolute right-2 top-2 flex flex-col gap-2 md:right-4 md:top-4'>
        <Button
          className='h-7 w-7 md:h-10 md:w-10'
          size='icon'
          onClick={() => setIsMuted((prev) => !prev)}
        >
          {isMuted ? (
            <VolumeX className='h-5 w-5' />
          ) : (
            <Volume2 className='h-5 w-5' />
          )}
        </Button>
        <Link href={url} target='_blank'>
          <Button className='h-7 w-7 md:h-10 md:w-10' size='icon'>
            <Youtube className='h-5 w-5' />
          </Button>
        </Link>
      </div>
      <ReactPlayer
        url={url}
        width='120%'
        height='130%'
        muted={isMuted}
        playing={isPlaying}
        loop
        playIcon={<Play className='h-7 w-8 fill-primary-foreground' />}
        stopOnUnmount
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              disablekb: 1,
              controls: 0,
              autohide: 1,
              // autoplay: 1,
              iv_load_policy: 3,
              cc_load_policy: 3,
              fs: 0,
              showinfo: 0,
              showsearch: 0,
              rel: 0,
            },
          },
        }}
        {...props}
      />
    </figure>
  );
}
