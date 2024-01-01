'use client';

import {
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  type MouseEvent,
} from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { buildImagePath } from '@libs/tmdb';
import { OpenOriginalImage } from '@components/open-original-image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@libs/index';

interface ExpandImageDialogProps {
  path: string;
  alt: string;
  children: ReactNode;
}

export function ExpandImageDialog({
  path,
  alt,
  children,
}: ExpandImageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = useMemo(() => buildImagePath({ path }), [path]);
  useEffect(() => void setIsOpen(false), [imageSrc]);

  if (!imageSrc) return children;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='md:max-h-auto h-fit max-h-[90vh] overflow-hidden'>
        <DialogHeader>
          <DialogTitle className=''>{alt}</DialogTitle>
          <DialogDescription>
            A Comprehensive Peek into Image Specifications
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-between gap-4'>
          <ChevronLeft className='h-7 w-7 cursor-pointer' />
          <div className='h-full w-full'>
            <ExpandImageDialogContent path={path} />
            <OpenOriginalImage path={path} />
          </div>
          <ChevronRight className='h-7 w-7 cursor-pointer' />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface Proportion {
  x: number;
  y: number;
  scale: number;
}

const initialProportion: Proportion = {
  x: 0,
  y: 0,
  scale: 1,
};

function ExpandImageDialogContent({
  path,
}: Pick<ExpandImageDialogProps, 'path'>) {
  const [proportion, setProportion] = useState<Proportion>(initialProportion);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const zoomer = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - zoomer.x) / zoomer.width) * 100;
    const y = ((event.clientY - zoomer.y) / zoomer.height) * 100;

    setProportion({
      x,
      y,
      scale: 2,
    });
  };

  const handleMouseLeave = () => {
    setProportion(initialProportion);
  };

  return (
    <div
      className='relative aspect-[2/3] h-auto w-full cursor-zoom-in overflow-hidden rounded-md'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='z-10 h-full w-full bg-black object-cover will-change-contents'
        style={{
          backgroundImage: `url( ${buildImagePath({ path })} )`,
          backgroundSize: `${proportion.scale * 100}%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${proportion.x}% ${proportion.y}%`,
        }}
      />
      <div
        className={cn(
          'absolute left-0 top-0 z-20 h-[64px] w-[64px]',
          '-translate-x-[32px] -translate-y-[32px]',
          'cursor-none rounded-md border bg-background/30',
          !(proportion.x && proportion.y) && 'hidden'
        )}
        style={{
          top: `${proportion.y}%`,
          left: `${proportion.x}%`,
        }}
      />
    </div>
  );
}
