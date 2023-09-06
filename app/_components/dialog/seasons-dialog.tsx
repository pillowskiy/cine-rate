import { ISeason } from '@/app/_types/tv-types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { SeasonCard } from '../article/season-article';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface SeasonsDialogProps {
  seriesId: number;
  seasons: ISeason[];
}

export function SeasonsDialog({ seasons, seriesId }: SeasonsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View all seasons</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seasons</DialogTitle>
          <DialogDescription>All seasons of the series</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <div className='mr-4 max-h-[460px] space-y-4'>
            {seasons.map((season) => (
              <SeasonCard
                key={season.id}
                season={season}
                action={
                  <Link
                    href={{
                      pathname: `/tv/${seriesId}/episodes`,
                      query: { season: season.season_number },
                    }}
                  >
                    <DialogClose asChild>
                      <Button>Read more</Button>
                    </DialogClose>
                  </Link>
                }
              />
            ))}
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
