import type { ReactNode } from 'react';
import type { MediaType } from '@app/types/index';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@ui/dialog';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import { Separator } from '@ui/separator';
import { Toggle } from '@ui/toggle';
import { Slider } from '@ui/slider';
import { getGenres } from '@actions/getGenres';

interface CreationFilterDialogProps {
  mediaType: MediaType;
  children: ReactNode;
}

export async function CreationFilterDialog({
  mediaType,
  children,
}: CreationFilterDialogProps) {
  const { data: genreList } = await getGenres(mediaType);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtering</DialogTitle>
          <DialogDescription>
            Refine your film experience with our cutting-edge filters.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <div className='mr-4 max-h-[460px] space-y-4'>
            <h2>Realese Date</h2>
            <div className='flex justify-between gap-4'>
              <div className='grid w-full max-w-sm items-center gap-2'>
                <Label htmlFor='realese_from'>From</Label>
                <Input id='realese_from' type='date' />
              </div>
              <div className='grid w-full max-w-sm items-center gap-2'>
                <Label htmlFor='realese_to'>To</Label>
                <Input id='realese_to' type='date' />
              </div>
            </div>
            <Separator className='my-4' />

            <div className='grid w-full items-center gap-2'>
              <Label>Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Choose language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='en-US'>English</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='grid w-full items-center gap-2'>
              <Label>Genres</Label>
              <div className='flex flex-wrap gap-2'>
                {!!genreList.genres.length &&
                  genreList.genres.map((genre) => (
                    <Toggle className='h-7 border' key={genre.id} size='sm'>
                      {genre.name}
                    </Toggle>
                  ))}
              </div>
            </div>

            <Separator className='my-4' />

            <div className='grid w-full items-center gap-2'>
              <Label>User evaluation</Label>
              <div className='space-y-2'>
                <Slider defaultValue={[10]} max={10} step={1} />
                <div className='flex items-center justify-between'>
                  <div className='mx-3' />
                  {Array.from({ length: ~~(10 / 5) }, (_, index) => (
                    <span className='text-sm' key={index}>
                      {(index + 1) * 5}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='grid w-full items-center gap-2'>
              <Label>Minimal size of user evaluation</Label>
              <div className='space-y-2'>
                <Slider defaultValue={[0]} max={500} step={50} />
                <div className='flex items-center justify-between'>
                  <div className='mx-3' />
                  {Array.from({ length: 500 / 100 }, (_, index) => (
                    <span className='ml-2 text-sm' key={index}>
                      {(index + 1) * 100}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='grid w-full items-center gap-2'>
              <Label>Duration (minutes)</Label>
              <div className='space-y-2'>
                <Slider defaultValue={[180]} max={360} step={15} />
                <div className='flex items-center justify-between'>
                  <div className='mx-4' />
                  {Array.from({ length: 360 / 60 }, (_, index) => (
                    <span className='ml-2 text-sm' key={index}>
                      {(index + 1) * 60}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Search</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
