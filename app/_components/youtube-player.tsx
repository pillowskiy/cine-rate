'use client';

import { cn } from '@libs/index';
import { videoFormat } from 'ytdl-core';
import { Bot, Loader2, Play, Volume2, Youtube } from 'lucide-react';
import { useFetch } from '@hooks/useFetch';
import useOnScreen from '@hooks/useOnScreen';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface YoutubePlayerProps {
  url: string;
  className?: string;
}

interface VideoStateOptions {
  isPlaying?: boolean;
}

export function YoutubePlayer({ url, className }: YoutubePlayerProps) {
  const { data: format, error } = useFetch<videoFormat>('/api/stream/video', {
    params: { url },
  }, [url]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  // TEMP: transition to framer motion InView hook
  const isVisible = useOnScreen(videoRef);
  const [options, setOptions] = useState<VideoStateOptions>({});

  useEffect(() => void playingChange(isVisible), [isVisible])

  function playingChange(isPlaying: boolean) {
    if (!videoRef.current) return;
    videoRef.current[isPlaying ? 'pause' : 'play']();
    setOptions((prev) => ({ ...prev, isPlaying: !videoRef.current?.paused }));
  }

  function handlePlaying() {
    if (!videoRef.current) return;
    const isPaused = videoRef.current.paused;
    playingChange(!isPaused);
  }

  function handle() {
    if (!format && !error) {
      return (
        <div className='grid h-full w-full place-items-center text-center'>
          <div className='flex flex-col items-center justify-center space-y-1'>
            <Loader2 className='h-[64px] w-[64px] animate-spin' />
            <span className='text-sm text-foreground/70'>
              Processing data...
            </span>
          </div>
        </div>
      );
    }

    if (format) {
      return (
        <div className='relative h-full w-full'>
          <video
            ref={videoRef}
            className='absolute bottom-0 w-full object-cover align-top'
            src={format.url}
            width='100%'
            height='100%'
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className='absolute bottom-0 left-0 z-20 flex w-full justify-between p-4'>
            <div
              className='flex cursor-pointer items-center transition-all hover:underline'
              onClick={handlePlaying}
            >
              <Play className='mr-2 h-5 w-5 sm:h-8 sm:w-8' />
              <span className='text-sm sm:text-base'>
                {options.isPlaying ? 'Pause' : 'Play'} trailer
              </span>
            </div>

            <div className='ml-auto flex items-center gap-2'>
              <Volume2 className='h-5 w-5 cursor-pointer transition-all sm:h-8 sm:w-8 md:hover:-translate-y-[8px] md:hover:scale-110' />
              <Link href={url} target='_blank'>
                <Youtube className='h-5 w-5 cursor-pointer transition-all sm:h-8 sm:w-8 md:hover:-translate-y-[8px] md:hover:scale-110' />
              </Link>
            </div>
          </div>
          <div className='absolute bottom-0 z-10 h-full w-full bg-gradient-to-t from-black' />
        </div>
      );
    }

    return (
      <div className='grid h-full w-full place-items-center text-center'>
        <div className='flex flex-col items-center justify-center space-y-1'>
          <Bot className='h-[64px] w-[64px] animate-pulse shadow-yellow-500 ' />
          <span className='text-sm text-foreground/70'>
            {error?.response?.data.message || 'Oops! Something went wrong..'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <figure
      className={cn(
        'relative grid place-items-center overflow-hidden bg-black',
        className
      )}
    >
      {handle()}
    </figure>
  );
}
