import { useEffect, useState } from 'react';
import { cn } from '../_libs';
import { ReactPlayerProps } from 'react-player';
import { VolumeX, Volume2, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { getInfo as getVideoInfo, chooseFormat } from 'ytdl-core';

interface YoutubePlayerProps extends ReactPlayerProps {
  url: string;
  className?: string;
}

export async function YoutubePlayer({
  url,
  className,
  ...props
}: YoutubePlayerProps) {
  const info = await getVideoInfo(url).catch((e) => {
    console.log(e);
    return e;
  });
  const format = chooseFormat(info.formats, { quality: 'highestvideo' });

  return (
    <figure
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-md backdrop-blur-lg',
        className
      )}
    >
      <video
        className='width-[inherit] absolute w-[inherit] align-top object-cover'
        src={format.url}
        controls
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    </figure>
  );
}
