'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Image as FallbackIcon } from 'lucide-react';
import { cn } from '#libs/index';

type ImageFromPathProps = Omit<ImageProps, 'src'> & {
  src: string | null;
};

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
        // Prevent overriden styles from the parent component
        style={{ width: '100%', height: '100%' }}
        className={cn(className, 'bg-secondary grid place-items-center')}
      >
        <FallbackIcon className='text-primary/70 m-auto size-12' />
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
      onLoadingComplete={() => setIsLoading(false)}
      quality={quality}
      {...props}
    />
  );
}
