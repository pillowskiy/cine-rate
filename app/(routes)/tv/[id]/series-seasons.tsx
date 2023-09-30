import type { ITVDetails } from '@app/types/tv-types';
import { Separator } from '@ui/separator';
import { Button } from '@ui/button';
import { SeasonsDialog } from '@components/dialog/seasons-dialog';
import { SeasonArticle } from '@components/article/season-article';
import { Heading } from '@components/heading';
import Link from 'next/link';

interface SerriesSeasonsProps {
  details: ITVDetails;
}

export default async function SerriesSeasons({ details }: SerriesSeasonsProps) {
  const title =
    details.title || details.original_title || details.original_name;
  const currentSeason = details.seasons.at(-1)!;

  return (
    <section>
      <Heading title='Seasons' description={`Seasons of the ${title} series`} />
      <Separator className='my-4' />

      <SeasonArticle
        className='rounded-md border p-4'
        season={currentSeason}
        action={
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Link
              href={{
                pathname: `/tv/${details.id}/episodes`,
                query: { season: currentSeason.season_number },
              }}
              passHref
              legacyBehavior
            >
              <Button>More info about {currentSeason.name}</Button>
            </Link>
            <SeasonsDialog seriesId={details.id} seasons={details.seasons} />
          </div>
        }
      />
    </section>
  );
}
