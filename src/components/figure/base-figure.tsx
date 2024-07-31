import { cn } from '#libs/index';
import {
  ImageFromPath,
  type ImageFromPathProps,
} from '../image/image-from-path';

interface BaseFigureProps extends ImageFromPathProps {
  className?: string;
}

export function BaseFigure({ className, ...props }: BaseFigureProps) {
  return (
    <figure className={cn('w-full overflow-hidden rounded-md', className)}>
      <ImageFromPath
        className={
          'h-auto w-full object-cover transition-all ease-in-out hover:scale-105'
        }
        {...props}
      />
    </figure>
  );
}
