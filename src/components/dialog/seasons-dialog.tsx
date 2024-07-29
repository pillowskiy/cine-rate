import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ISeason } from '#types/tv-types';
import { Button } from '#ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#ui/dialog';
import { ScrollArea, ScrollBar } from '#ui/scroll-area';
import { SeasonArticle } from '#components/article/season-article';

interface SeasonsDialogProps {
  seriesId: number;
  seasons: ISeason[];
}

export function SeasonsDialog({ seasons, seriesId }: SeasonsDialogProps) {
  const t = useTranslations('Dialogs.SeasonsDialog');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{t('triggerLabel')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
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
                      <Button className='w-full sm:w-fit'>
                        {t('readMore')}
                      </Button>
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
