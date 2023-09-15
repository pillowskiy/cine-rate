import type { IEpisode } from '@app/types/tv-types';
import { Separator } from '@ui/separator';
import { getEpisodeDetails } from '@actions/getEpisodeDetails';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { CreditArticle } from '@/app/_components/article/credit-article';

interface EpisodeDetailsProps {
  episode: IEpisode;
  seriesId: number;
}

export async function EpisodeDetails({
  episode,
  seriesId,
}: EpisodeDetailsProps) {
  const { season_number, episode_number } = episode;
  const { data: details } = await getEpisodeDetails(
    seriesId,
    season_number,
    episode_number
  ).catch(() => ({ data: null }));

  if (!details) return null;

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem className='border-b-0' value='item-1'>
        <AccordionTrigger className='p-0'>Expand</AccordionTrigger>
        <AccordionContent>
          <section className='mt-4 flex gap-4'>
            <div className='w-full min-w-[260px] sm:w-[260px]'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Crew ({details.crew.length})
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Crew of episode.
                  </p>
                </div>
              </div>
              <Separator className='my-4' />

              <ul className='space-y-4'>
                {details.crew.map((crew) => (
                  <li key={crew.id}>
                    <span className='font-semibold'>{crew.original_name}</span>
                    <p className='text-foreground/70'>{crew.department}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex-grow'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Guest Stars ({details.guest_stars.length})
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Star-Studded Special Appearances.
                  </p>
                </div>
              </div>
              <Separator className='my-4' />

              <section className='grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto'>
                {details.guest_stars.map((star) => (
                  <CreditArticle
                    aspect='vertical'
                    figureClassName='w-[80px] h-auto object-cover object-top'
                    className='flex gap-4'
                    key={star.id}
                    credit={star}
                    width={256}
                    height={256}
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
