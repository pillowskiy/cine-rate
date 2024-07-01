import type { ComponentProps } from 'react';
import type { ITVDetails } from '#types/tv-types';
import { MediaType } from '#config/enums';
import { List, ListItem } from '#ui/list';
import { MSeparator } from '#ui/separator';
import { getTitle } from '#components/creation/common/utils';
import CreationExternalLinks from '#components/creation/creation-external-links';
import CreationKeywords from '#components/creation/creation-keywords';
import { Heading } from '#components/heading';

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
        <Heading
          title='Details'
          description={`Interesting about ${getTitle(details)}.`}
        />
        <MSeparator className='my-4' />

        <List>
          <ListItem title='Status:' description={details.status} />
          <ListItem
            title='Original Language:'
            description={details.original_language?.toUpperCase() ?? 'Unknown'}
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

      <CreationExternalLinks externalIds={details.external_ids} />

      <CreationKeywords mediaType={MediaType.TV} details={details} />
    </div>
  );
}
