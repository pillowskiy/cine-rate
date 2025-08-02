'use client';

import { ComponentProps, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { Bot, Expand, Loader2, Play, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CreationTrailerResponse } from '#types/creation-types';
import useFetch from '#hooks/useFetch';
import { YoutubeEmbedDialog } from '#components/dialog/youtube-embed-dialog';
import { cn } from '#libs/index';
import { minutesFormat } from '#libs/time';
import type { CreationIdentifierProps } from './common/types';

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
  const t = useTranslations('Creations.CreationTrailer.VideoResource');
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
    if (!isVisible) playingChange(false);
  }, [isVisible]);

  function playingChange(isPlaying: boolean = !!videoRef.current?.paused) {
    if (!videoRef.current) return;
    videoRef.current[isPlaying ? 'play' : 'pause']();
    setOptions((prev) => ({ ...prev, isPlaying }));
  }

  if (!data && !error) {
    return (
      <div className='grid size-full place-items-center text-center'>
        <div className='flex flex-col items-center justify-center space-y-1'>
          <Loader2 className='size-[48px] animate-spin sm:size-[64px]' />
          <span className='text-foreground/70 text-sm'>
            {t('loadingLabel')}
          </span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='grid size-full place-items-center text-center'>
        <div className='flex flex-col items-center justify-center space-y-1 p-6'>
          <Bot className='size-[64px] animate-pulse shadow-yellow-500 ' />
          <span className='text-foreground/70 text-sm'>
            {error?.message || t('unhandledError')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='relative size-full after:absolute after:inset-0 after:bg-linear-to-t after:from-black'>
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
        {t('browserNotSupported')}
      </video>
      <div className='absolute bottom-0 left-0 z-10 flex w-full justify-between p-4'>
        <button
          className='flex cursor-pointer items-center px-1 transition-all hover:underline'
          onClick={() => playingChange()}
        >
          <Play className='mr-2 size-5 sm:size-8' />
          <span className='text-sm sm:text-base'>
            {options.isPlaying ? t('pauseTrailer') : t('playTrailer')}
            <i className='ml-2 text-sm not-italic opacity-80'>
              {minutesFormat(+data.details.lengthSeconds)}
            </i>
          </span>
        </button>

        <div className='ml-auto flex items-center gap-2'>
          <Link href={data.details.video_url} target='_blank'>
            <Youtube className='size-5 cursor-pointer transition-all sm:size-8' />
            <span className='sr-only'>{t('openOriginalVideo')}</span>
          </Link>

          <YoutubeEmbedDialog
            details={data.details}
            onOpenChange={(open) => open && playingChange(false)}
          >
            <button className='p-1' aria-label='Open Youtube Embed Video'>
              <Expand className='size-5 cursor-pointer transition-all sm:size-6' />
            </button>
          </YoutubeEmbedDialog>
        </div>
      </div>
    </div>
  );
}
