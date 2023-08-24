import { CreationArticle } from '@components/article/creation-article';
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
import {
  LayoutGrid,
  StretchHorizontal,
  LayoutList,
  Filter,
} from 'lucide-react';

import { getDiscover } from '@actions/getDiscover';
import { Sort } from '@actions/getMovies';
import { MediaType } from '@app/types/index';
import { capitalize } from '@libs/index';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { getGenres } from '@actions/getGenres';
import { Toggle } from '@/app/_components/ui/toggle';
import { Slider } from '@/app/_components/ui/slider';
import { ScrollArea, ScrollBar } from '@/app/_components/ui/scroll-area';
import { Separator } from '@/app/_components/ui/separator';

export default async function MoviesPage() {
  const { data: movies } = await getDiscover(MediaType.Movie);
  const { data: genreList } = await getGenres(MediaType.Movie);
  // TEMP
  if (!movies || !genreList.genres.length) return null;

  return (
    <main className='space-y-6'>
      <header className='flex justify-between gap-4 overflow-hidden py-2'>
        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='icon' variant='outline' title='Filter'>
                <Filter className='h-5 w-5' />
              </Button>
            </DialogTrigger>
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
                      {genreList.genres.map((genre) => (
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
          <div className='hidden gap-2 md:flex'>
            <Select defaultValue={Sort.Popular}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort results by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(Sort).map((sortMethod) => (
                    <SelectItem key={sortMethod} value={sortMethod}>
                      {capitalize(sortMethod.replace('_', ' '), {
                        assignLowerCase: true,
                      })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select defaultValue='all'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Show me' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='watched'>Movies Watched</SelectItem>
                  <SelectItem value='unwatched'>Unwatched Movies</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button size='icon' title='Compact View' variant='outline'>
            <StretchHorizontal className='h-5 w-5' />
          </Button>
          <Button size='icon' title='Detailed View' variant='outline'>
            <LayoutList className='h-5 w-5' />
          </Button>
          <Button size='icon' title='Grid View'>
            <LayoutGrid className='h-5 w-5' />
          </Button>
        </div>
      </header>
      <section className='flex flex-wrap gap-4'>
        {movies.results.map((movie) => (
          <CreationArticle
            key={movie.id}
            creation={movie}
            className='mb-4 w-[40%] flex-grow md:w-[260px]'
            width={260}
            height={390}
          />
        ))}
      </section>
    </main>
  );
}
