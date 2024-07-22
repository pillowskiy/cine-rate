import Link from 'next/link';
import type { ITVDetails } from '#types/tv-types';
import { Button } from '#ui/button';
import { SeasonArticle } from '#components/article/season-article';
import { SeasonsDialog } from '#components/dialog/seasons-dialog';
import { TitledSection } from '#components/section/titled';

interface SerriesSeasonsProps {
  details: ITVDetails;
}

export default function SerriesSeasons({ details }: SerriesSeasonsProps) {
  const title =
    details.title || details.original_title || details.original_name;
  const currentSeason = details.seasons.filter((s) => s.air_date).at(-1);

  if (!currentSeason) return null;

  return (
    <TitledSection title='Seasons' subTitle={`Seasons of the ${title} series`}>
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
              <Button>More about Season {currentSeason.season_number}</Button>
            </Link>
            <SeasonsDialog seriesId={details.id} seasons={details.seasons} />
          </div>
        }
      />
    </TitledSection>
  );
}
