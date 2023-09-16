import type { ITVDetails } from '@app/types/tv-types';
import { MediaType } from '@app/types/index';
import CreationKeywords from '@components/creation/creation-keywords';
import { getTitle } from '@components/creation/common/utils';
import { Separator } from '@ui/separator';
import { HTMLAttributes } from 'react';

interface SeriesDetailsProps extends HTMLAttributes<HTMLDivElement> {
  details: ITVDetails;
}

export default async function SeriesDetails({
  details,
  ...props
}: SeriesDetailsProps) {
  return (
    <div {...props}>
      <section>
        <div className='flex items-center justify-between'>
          <div className='space-y-1 max-w-full'>
            <h2 className='text-2xl font-semibold tracking-tight'>Details</h2>
            <p className='text-sm text-muted-foreground truncate'>
              Interesting about {getTitle(details)}.
            </p>
          </div>
        </div>
        <Separator className='my-4' />

        <ul className='space-y-6'>
          <li>
            <span className='font-semibold'>Status</span>
            <p className='text-foreground/70'>{details.status}</p>
          </li>

          <li>
            <span className='font-semibold'>Original Language</span>
            <p className='text-foreground/70'>
              {details.original_language.toUpperCase()}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Created By</span>
            <p className='text-foreground/70'>
              {details.created_by.map(celebrity => celebrity.name).join(', ')}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Number of Seasons</span>
            <p className='text-foreground/70'>
              {details.number_of_seasons} seasons ({details.number_of_episodes} episodes)
            </p>
          </li>

          <li>
            <span className='font-semibold'>First Air Date</span>
            <p className='text-foreground/70'>
              {new Date(details.first_air_date).toDateString()}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Runtime</span>
            <p className='text-foreground/70'>
              {details.runtime}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Production Companies</span>
            <p className='text-foreground/70'>
              {details.production_companies.map(company => company.name).join(', ')}
            </p>
          </li>
        </ul>
      </section>

      <CreationKeywords mediaType={MediaType.TV} details={details} />
    </div>
  );
}
