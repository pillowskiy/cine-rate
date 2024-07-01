import type { ComponentProps } from 'react';

import type { IMovieDetails } from '@app/types/movies-types';

import { MediaType } from '@config/enums';

import { List, ListItem } from '@ui/list';
import { MSeparator } from '@ui/separator';

import { getTitle } from '@components/creation/common/utils';
import CreationExternalLinks from '@components/creation/creation-external-links';
import CreationKeywords from '@components/creation/creation-keywords';
import { Heading } from '@components/heading';

interface MovieDetailsProps extends ComponentProps<'div'> {
  details: IMovieDetails;
}

// TEMP: to tmdb utils
function getLocaleCurrency(amount?: number | null) {
  return amount
    ? amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : 'Unknown';
}

export default async function MovieDetails({
  details,
  ...props
}: MovieDetailsProps) {
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
            title='Budget:'
            description={getLocaleCurrency(details.budget)}
          />
          <ListItem
            title='Revenue:'
            description={getLocaleCurrency(details.revenue)}
          />
          <ListItem
            title='Production Companies:'
            description={details.production_companies
              .map((company) => company.name)
              .join(', ')}
          />
        </List>
      </section>

      <CreationExternalLinks externalIds={details.external_ids} />

      <CreationKeywords mediaType={MediaType.Movie} details={details} />
    </div>
  );
}
