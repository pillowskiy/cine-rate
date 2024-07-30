'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#ui/dialog';
import HoverScalableImage from '#components/image/hover-scalable-image';
import { OpenOriginalImage } from '#components/open-original-image';
import { buildImagePath } from '#libs/tmdb';

interface ExpandImageDialogProps {
  path: string;
  alt: string;
  children: React.ReactNode;
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
      <DialogContent className='h-fit max-h-[90vh] max-w-md overflow-hidden'>
        <DialogHeader>
          <DialogTitle>{alt}</DialogTitle>
          <DialogDescription>
            A Comprehensive Peek into Image Specifications
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-between gap-4'>
          <ChevronLeft className='size-7 cursor-pointer' />
          <div className='size-full'>
            <HoverScalableImage src={imageSrc} />
            <OpenOriginalImage path={path} />
          </div>
          <ChevronRight className='size-7 cursor-pointer' />
        </div>
      </DialogContent>
    </Dialog>
  );
}
