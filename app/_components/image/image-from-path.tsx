'use client';

import Image, { type ImageProps } from 'next/image';
import { Image as FallbackIcon } from 'lucide-react';
import { cn } from '@libs/index';
import { useState } from 'react';

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
          'grid h-full w-full place-items-center bg-secondary'
        )}
      >
        <FallbackIcon className='m-auto h-12 w-12 text-primary/70' />
      </div>
    );
  }

  return (
    <Image
      className={cn(
        'transition-all duration-500',
        className,
        isLoading && 'blur-xl w-full h-full',
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
