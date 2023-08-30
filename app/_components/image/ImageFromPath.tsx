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
  return <Image className={className} alt={alt} src={src} {...props} />;
}
