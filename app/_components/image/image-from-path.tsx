'use client';

import { useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import { Image as FallbackIcon } from 'lucide-react';

import { cn } from '@libs/index';

type ImageFromPathProps = Omit<ImageProps, 'src'> & {
  src: string | null;
};

export function ImageFromPath({
  src,
  alt,
  className,
  ...props
}: ImageFromPathProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return (
      <div
        className={cn(
          className,
          'bg-secondary grid size-full place-items-center'
        )}
      >
        <FallbackIcon className='text-primary/70 m-auto size-12' />
      </div>
    );
  }

  return (
    <Image
      className={cn(
        'transition-all duration-500',
        className,
        isLoading && 'size-full blur-xl'
      )}
      alt={alt}
      src={src}
      placeholder='blur'
      blurDataURL={`/_next/image?url=${encodeURIComponent(src)}&q=1&w=128`}
      onLoadingComplete={() => setIsLoading(false)}
      {...props}
    />
  );
}
