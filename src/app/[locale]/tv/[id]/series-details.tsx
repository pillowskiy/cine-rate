import type { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import type { ITVDetails } from '#types/tv-types';
import { MediaType } from '#config/enums';
import { List, ListItem } from '#ui/list';
import { getTitle } from '#components/creation/common/utils';
import CreationExternalLinks from '#components/creation/creation-external-links';
import CreationKeywords from '#components/creation/creation-keywords';
import { TitledSection } from '#components/section/titled';

interface SeriesDetailsProps extends ComponentProps<'div'> {
  details: ITVDetails;
}

export default function SeriesDetails({
  details,
  ...props
}: SeriesDetailsProps) {
  const t = useTranslations('TVPage.TVDetails');

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
            description={details.original_language?.toUpperCase() ?? 'Unknown'}
          />
          <ListItem
            title={t('List.createdBy')}
            description={details.created_by
              .map((celebrity) => celebrity.name)
              .join(', ')}
          />
          <ListItem
            title={t('List.numberOfSeasons')}
            description={`${details.number_of_seasons} seasons (${details.number_of_episodes} episodes)`}
          />
          <ListItem
            title={t('List.firstAirDate')}
            description={new Date(details.first_air_date).toDateString()}
          />
          {details.runtime && (
            <ListItem
              title={t('List.runtime')}
              description={details.runtime.toString()}
            />
          )}
          <ListItem
            title={t('List.productionCompanies')}
            description={details.production_companies
              .map((company) => company.name)
              .join(', ')}
          />
        </List>
      </TitledSection>

      <CreationExternalLinks externalIds={details.external_ids} />
      <CreationKeywords mediaType={MediaType.TV} details={details} />
    </div>
  );
}
