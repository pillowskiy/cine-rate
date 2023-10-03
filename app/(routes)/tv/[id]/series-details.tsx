import type { ITVDetails } from '@app/types/tv-types';
import type { ComponentProps } from 'react';
import { MediaType } from '@config/enums';
import CreationKeywords from '@components/creation/creation-keywords';
import { getTitle } from '@components/creation/common/utils';
import { MSeparator } from '@ui/separator';
import { List, ListItem } from '@ui/list';

interface SeriesDetailsProps extends ComponentProps<'div'> {
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
          <div className='max-w-full space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Details</h2>
            <p className='truncate text-sm text-muted-foreground'>
              Interesting about {getTitle(details)}.
            </p>
          </div>
        </div>
        <MSeparator className='my-4' />

        <List>
          <ListItem title='Status:' description={details.status} />
          <ListItem
            title='Original Language:'
            description={details.original_language.toUpperCase()}
          />
          <ListItem
            title='Created By:'
            description={details.created_by
              .map((celebrity) => celebrity.name)
              .join(', ')}
          />
          <ListItem
            title='Number of Seasons:'
            description={`${details.number_of_seasons} seasons (${details.number_of_episodes} episodes)`}
          />
          <ListItem
            title='First Air Date:'
            description={new Date(details.first_air_date).toDateString()}
          />
          {details.runtime && (
            <ListItem
              title='Runtime:'
              description={details.runtime.toString()}
            />
          )}
          <ListItem
            title='Production Companies:'
            description={details.production_companies
              .map((company) => company.name)
              .join(', ')}
          />
        </List>
      </section>

      <CreationKeywords mediaType={MediaType.TV} details={details} />
    </div>
  );
}
