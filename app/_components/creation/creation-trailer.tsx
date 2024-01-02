'use client';

import type { CreationIdentifierProps } from './common/types';
import type { CreationTrailerResponse } from '@app/types/creation-types';
import { type ComponentProps, useEffect, useRef, useState } from 'react';
import {
  Bot,
  Expand,
  Loader2,
  MoreHorizontal,
  Play,
  Youtube,
} from 'lucide-react';
import { Button } from '@ui/button';
import { YoutubeEmbedDialog } from '@components/dialog/youtube-embed-dialog';
import Link from 'next/link';
import useFetch from '@hooks/useFetch';
import { useInView } from 'framer-motion';
import { cn } from '@libs/index';
import { minutesFormat } from '@libs/time';

interface CreationTrailerProps
  extends CreationIdentifierProps,
    ComponentProps<'figure'> {}

export function CreationTrailer({
  mediaType,
  creationId,
  className,
  ...props
}: CreationTrailerProps) {
  return (
    <figure
      className={cn(
        'relative grid place-items-center overflow-hidden bg-black',
        className
      )}
      {...props}
    >
      <VideoResource creationId={creationId} mediaType={mediaType} />
    </figure>
  );
}

interface VideoStateOptions {
  isPlaying?: boolean;
}

function VideoResource({ creationId, mediaType }: CreationIdentifierProps) {
  const { data, error } = useFetch<CreationTrailerResponse>(
    `/api/${mediaType}/${creationId}/trailer`
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  /* TEMP: It's possible to use `useInView` hook here, but it's not working properly
   * look https://forum.freecodecamp.org/t/nextjs-and-framer-motion/456236
   */
  const isVisible = useInView(videoRef);
  const [options, setOptions] = useState<VideoStateOptions>({});

  useEffect(() => {
    if (!isVisible) {
      playingChange(false);
    }
  }, [isVisible]);

  function playingChange(isPlaying: boolean = !!videoRef.current?.paused) {
    if (!videoRef.current) return;
    videoRef.current[isPlaying ? 'play' : 'pause']();
    setOptions((prev) => ({ ...prev, isPlaying }));
  }

  if (!data && !error) {
    return (
      <div className='grid h-full w-full place-items-center text-center'>
        <div className='flex flex-col items-center justify-center space-y-1'>
          <Loader2 className='h-[48px] w-[48px] animate-spin sm:h-[64px] sm:w-[64px]' />
          <span className='text-sm text-foreground/70'>Processing data...</span>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className='relative h-full w-full after:absolute after:inset-0 after:bg-gradient-to-t after:from-black'>
        <div className='absolute left-0 top-0 z-10 flex w-full flex-row-reverse p-4'>
          <Button
            className='h-7 w-7 sm:h-8 sm:w-8'
            variant='outline'
            size='icon'
            disabled
          >
            <MoreHorizontal className='h-5 w-5' />
            <span className="sr-only">Trailer Options Menu</span>
          </Button>
        </div>
        <video
          ref={videoRef}
          className='absolute bottom-0 w-full object-cover align-top'
          src={data.format.url}
          width='100%'
          height='100%'
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        <div className='absolute bottom-0 left-0 z-10 flex w-full justify-between p-4'>
          <button
            className='flex cursor-pointer items-center transition-all hover:underline px-1'
            onClick={() => playingChange()}
          >
            <Play className='mr-2 h-5 w-5 sm:h-8 sm:w-8' />
            <span className='text-sm sm:text-base'>
              {options.isPlaying ? 'Pause' : 'Play'} trailer
              <i className='ml-2 text-sm not-italic text-foreground/80'>
                {minutesFormat(+data.details.lengthSeconds)}
              </i>
            </span>
          </button>

          <div className='ml-auto flex items-center gap-2'>
            <Link href={data.details.video_url} target='_blank'>
              <Youtube className='h-5 w-5 cursor-pointer transition-all sm:h-8 sm:w-8' />
              <span className="sr-only">Open Original Video</span>
            </Link>

            <YoutubeEmbedDialog
              details={data.details}
              onOpenChange={(open) => open && playingChange(false)}
            >
              <button className='p-1' aria-label='Open Youtube Embed Video'>
                <Expand className='h-5 w-5 cursor-pointer transition-all sm:h-6 sm:w-6' />
              </button>
            </YoutubeEmbedDialog>
            {/* TODO video trailer actions */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='grid h-full w-full place-items-center text-center'>
      <div className='flex flex-col items-center justify-center space-y-1 p-6'>
        <Bot className='h-[64px] w-[64px] animate-pulse shadow-yellow-500 ' />
        <span className='text-sm text-foreground/70'>
          {error?.message || 'O-ops! Something went wrong..'}
        </span>
      </div>
    </div>
  );
}
