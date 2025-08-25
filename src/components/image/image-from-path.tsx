'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Image as FallbackIcon } from 'lucide-react';
import { cn } from '#libs/index';

export interface ImageFromPathProps extends Omit<ImageProps, 'src'> {
  src: string | null;
}

export function ImageFromPath({
  src,
  alt,
  className,
  quality = 90,
  ...props
}: ImageFromPathProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className={cn(className, 'grid place-items-center bg-secondary')}
      >
        <FallbackIcon className='m-auto size-12 text-primary/70' />
      </div>
    );
  }

  return (
    <Image
      className={cn(
        'bg-secondary transition-all duration-500',
        className,
        isLoading && 'blur-md'
      )}
      alt={alt}
      src={src}
      placeholder='blur'
      blurDataURL={`/_next/image?url=${encodeURIComponent(src)}&q=1&w=64`}
      onLoad={() => setIsLoading(false)}
      quality={quality}
      {...props}
    />
  );
}
