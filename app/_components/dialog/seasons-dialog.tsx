import type { ISeason } from '@app/types/tv-types';
import { SeasonArticle } from '@components/article/season-article';
import { Button } from '@ui/button';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import Link from 'next/link';

interface SeasonsDialogProps {
  seriesId: number;
  seasons: ISeason[];
}

export function SeasonsDialog({ seasons, seriesId }: SeasonsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>View all seasons</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seasons</DialogTitle>
          <DialogDescription>All seasons of the series</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <div className='max-h-[460px] space-y-4'>
            {seasons.map((season, i) => (
              <SeasonArticle
                custom={i}
                key={season.id}
                season={season}
                action={
                  <Link
                    href={{
                      pathname: `/tv/${seriesId}/episodes`,
                      query: { season: season.season_number },
                    }}
                    passHref
                    legacyBehavior
                  >
                    <DialogClose asChild>
                      <Button className='w-full sm:w-fit'>Read more</Button>
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
