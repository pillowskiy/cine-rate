import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ITVDetails } from '#types/tv-types';
import { Button } from '#ui/button';
import { SeasonArticle } from '#components/article/season-article';
import { TitledSection } from '#components/section/titled';
import { getCreationTitle } from '#libs/tmdb';
import SeasonsDialog from './seasons-dialog';

interface SerriesSeasonsProps {
  details: ITVDetails;
}

export default function SeriesSeasons({ details }: SerriesSeasonsProps) {
  const t = useTranslations('TVPage.SeriesSeasons');

  const title = getCreationTitle(details);
  const currentSeason = details.seasons.filter((s) => s.air_date).at(-1);

  if (!currentSeason) return null;

  return (
    <TitledSection title={t('title')} subTitle={t('description', { title })}>
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
            >
              <Button>
                {t('moreAboutSeason', {
                  seasonNumber: currentSeason.season_number,
                })}
              </Button>
            </Link>
            <SeasonsDialog seriesId={details.id} seasons={details.seasons} />
          </div>
        }
      />
    </TitledSection>
  );
}
