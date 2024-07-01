import type { ReactNode } from 'react';

import type { DialogProps } from '@radix-ui/react-dialog';
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { MoreVideoDetails } from 'ytdl-core';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';

import { formatTimeAgo } from '@libs/time';

interface YoutubeEmbedDialogProps extends DialogProps {
  details: MoreVideoDetails;
  children: ReactNode;
}

export function YoutubeEmbedDialog({
  details,
  children,
  ...props
}: YoutubeEmbedDialogProps) {
  const url = new URL(details.embed.iframeUrl);
  url.searchParams.set('autoplay', '1');

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-3xl overflow-hidden px-4'>
        <DialogHeader className='mr-4'>
          <DialogTitle>{details.title}</DialogTitle>
        </DialogHeader>
        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md'>
          <iframe
            src={url.toString()}
            width='100%'
            height='100%'
            allowFullScreen
          ></iframe>
        </div>
        <div className='flex w-full flex-row gap-2'>
          <div className='flex items-center gap-2'>
            <Eye className='size-5' />
            <span className='text-foreground/80 text-sm'>
              {Intl.NumberFormat('en', { notation: 'compact' }).format(
                +details.viewCount
              )}{' '}
              views
            </span>
          </div>

          <span className='text-foreground/80 text-sm'>
            {formatTimeAgo(new Date(details.publishDate))}
          </span>

          <div className='ml-auto hidden gap-x-4 sm:flex'>
            {details.likes && (
              <div className='flex gap-x-2'>
                <ThumbsUp className='size-5 fill-current' />
                <span className='text-foreground/80 text-sm'>
                  {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    details.likes
                  )}
                </span>
              </div>
            )}

            {details.dislikes && (
              <div className='flex gap-x-2'>
                <ThumbsDown className='size-5 fill-current' />
                <span className='text-foreground/80 text-sm'>
                  {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    details.dislikes
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
