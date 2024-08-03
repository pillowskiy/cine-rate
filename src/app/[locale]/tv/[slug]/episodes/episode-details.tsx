import { getTranslations } from 'next-intl/server';
import type { BaseParams } from '#types/index';
import type { IEpisode } from '#types/tv-types';
import type { IEpisodeDetails } from '#types/tv-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#ui/accordion';
import { MSeparator } from '#ui/separator';
import { PersonArticle } from '#components/article/person-article';
import { Heading } from '#components/heading';
import { $api } from '#api/api-interceptor';

export function getEpisodeDetails(
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number,
  params?: BaseParams
) {
  return $api.safeFetch<IEpisodeDetails>(
    `/tv/${seriesId}` + `/season/${seasonNumber}` + `/episode/${episodeNumber}`,
    { params }
  );
}

interface EpisodeDetailsProps {
  episode: IEpisode;
  seriesId: number;
}

export async function EpisodeDetails({
  episode,
  seriesId,
}: EpisodeDetailsProps) {
  const t = await getTranslations('EpisodesPage.EpisodeDetails');
  const { season_number, episode_number } = episode;
  const [details, error] = await getEpisodeDetails(
    seriesId,
    season_number,
    episode_number
  );

  if (error) return null;

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem className='border-b-0' value='item-1'>
        <AccordionTrigger className='p-0'>{t('expand')}</AccordionTrigger>
        <AccordionContent>
          <section className='mt-4 flex flex-col gap-4 sm:flex-row'>
            <div className='w-full min-w-[260px] sm:w-[260px]'>
              <Heading
                title={t('CrewSection.title', {
                  crewNumber: details.crew.length,
                })}
                description={t('CrewSection.description')}
              />
              <MSeparator className='my-4' />

              <ul className='max-h-[200px] space-y-4 overflow-y-auto sm:max-h-[600px]'>
                {details.crew.map((crew) => (
                  <li key={crew.id}>
                    <span className='font-semibold'>{crew.original_name}</span>
                    <p className='text-foreground/70'>{crew.department}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className='grow'>
              <Heading
                title={t('GuestStartsSection.title', {
                  guestStarsNumber: details.guest_stars.length,
                })}
                description={t('GuestStartsSection.description')}
              />
              <MSeparator className='my-4' />

              <section className='grid max-h-[400px] gap-4 overflow-y-auto sm:max-h-[600px] md:grid-cols-2'>
                {details.guest_stars.map((star, i) => (
                  <PersonArticle
                    custom={i}
                    aspect='horizontal'
                    key={star.id}
                    person={star}
                    details={<span className='text-sm'>{star.character}</span>}
                  />
                ))}
              </section>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
