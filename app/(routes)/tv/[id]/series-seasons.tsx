import type { ITVDetails } from '@app/types/tv-types';
import { Separator } from '@ui/separator';
import { SeasonsDialog } from '@components/dialog/seasons-dialog';
import { SeasonCard } from '@components/article/season-article';

interface SerriesSeasonsProps {
  details: ITVDetails;
}

export default async function SerriesSeasons({ details }: SerriesSeasonsProps) {
  const title =
    details.title || details.original_title || details.original_name;
  const currentSeason = details.seasons.at(-1)!;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Seasons</h2>
          <p className='text-sm text-muted-foreground'>
            Seasons of the {title} series
          </p>
        </div>
      </div>
      <Separator className='my-4' />

      <SeasonCard
        className='rounded-md border p-4'
        season={currentSeason}
        action={
          <SeasonsDialog seriesId={details.id} seasons={details.seasons} />
        }
      />
    </section>
  );
}
