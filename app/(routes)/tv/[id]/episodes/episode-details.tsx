import type { BaseParams } from '@app/types/index';
import type { IEpisode } from '@app/types/tv-types';
import type { IEpisodeDetails } from '@app/types/tv-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { MSeparator } from '@ui/separator';
import { CreditArticle } from '@components/article/credit-article';
import { Heading } from '@components/heading';
import { $api } from '@api/api-interceptor';

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
        <AccordionTrigger className='p-0'>Expand</AccordionTrigger>
        <AccordionContent>
          <section className='mt-4 flex flex-col gap-4 sm:flex-row'>
            <div className='w-full min-w-[260px] sm:w-[260px]'>
              <Heading
                title={`Crew (${details.crew.length})`}
                description='Crew of episode.'
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
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Guest Stars ({details.guest_stars.length})
                  </h2>
                  <p className='text-muted-foreground text-sm'>
                    Star-Studded Special Appearances.
                  </p>
                </div>
              </div>
              <MSeparator className='my-4' />

              <section className='grid max-h-[400px] gap-4 overflow-y-auto sm:max-h-[600px] md:grid-cols-2'>
                {details.guest_stars.map((star, i) => (
                  <CreditArticle
                    custom={i}
                    aspect='vertical'
                    figureClassName='w-[80px] h-auto object-cover object-top'
                    className='flex gap-4'
                    key={star.id}
                    credit={star}
                    width={80}
                    height={80}
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
