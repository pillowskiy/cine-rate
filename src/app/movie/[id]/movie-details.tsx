import type { ComponentProps } from 'react';
import type { IMovieDetails } from '#types/movies-types';
import { MediaType } from '#config/enums';
import { List, ListItem } from '#ui/list';
import { getTitle } from '#components/creation/common/utils';
import CreationExternalLinks from '#components/creation/creation-external-links';
import CreationKeywords from '#components/creation/creation-keywords';
import { TitledSection } from '#components/section/titled';

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
      <TitledSection
        title='Details'
        subTitle={`Interesting about ${getTitle(details)}.`}
      >
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
      </TitledSection>

      <CreationExternalLinks externalIds={details.external_ids} />
      <CreationKeywords mediaType={MediaType.Movie} details={details} />
    </div>
  );
}
