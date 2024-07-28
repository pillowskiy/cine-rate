import type { ComponentProps } from 'react';
import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations('MoviePage.MovieDetails');

  return (
    <div {...props}>
      <TitledSection
        title={t('title')}
        subTitle={t('description', { title: getTitle(details) })}
      >
        <List>
          <ListItem title={t('List.status')} description={details.status} />
          <ListItem
            title={t('List.originalLanguage')}
            description={
              details.original_language?.toUpperCase() ?? t('noInfo')
            }
          />
          <ListItem
            title={t('List.budget')}
            description={getLocaleCurrency(details.budget)}
          />
          <ListItem
            title={t('List.revenue')}
            description={getLocaleCurrency(details.revenue)}
          />
          <ListItem
            title={t('List.productionCompanies')}
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
