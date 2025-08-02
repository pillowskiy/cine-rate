import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { AppPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { getPersonDetails } from '#actions/getPersonDetails';
import type { MediaType } from '#config/enums';
import { buildImagePath } from '#libs/tmdb';
import { pipeSlugId } from '#libs/tmdb/slugify';

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://cine-rate.vercel.app/';

export function generateCreationMetadata(mediaType: MediaType) {
  return async (props: AppPageParams): Promise<Metadata> => {
    const params = await props.params;
    const creationId = pipeSlugId(params.slug);
    const url = APP_URL + `${mediaType}/${creationId}`;

    const t = await getTranslations({
      locale: params.locale,
      namespace: 'CreationMetadata',
    });
    const [creation, error] = await getCreationDetails(creationId, mediaType, {
      language: params.locale,
    });

    if (error) {
      return generateNotFoundMetadata({
        url,
        description: t('error', { creationId }),
      });
    }

    const { title, original_title } = creation;
    const assignTitleException =
      'original_name' in creation ? creation.original_name : t('unknownTitle');
    const creationTitle = title || original_title || assignTitleException;
    const metadataTitle = `${creationTitle} — CineRate`;

    const backdropUrl = buildImagePath({ path: creation.backdrop_path });
    // const themeColor = await getAverageColorFromUrl(backdropUrl);
    const themeColor = '#ffffff';

    return {
      themeColor,
      title: metadataTitle,
      openGraph: {
        type: 'website',
        title: metadataTitle,
        images: backdropUrl ?? '/og-image.png',
        url,
        description: creation.overview,
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  };
}

export function generateNotFoundMetadata({
  url,
  ...ogMetadata
}: NonNullable<Metadata['openGraph']> = {}): Metadata {
  return {
    themeColor: '#ffffff',
    title: `Not Found — CineRate`,
    openGraph: {
      type: 'website',
      title: 'Not Found — CineRate',
      url: url || APP_URL,
      images: APP_URL + 'og-not-found.png',
      ...ogMetadata,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function generatePersonMetadata() {
  return async (props: AppPageParams): Promise<Metadata> => {
    const params = await props.params;
    const personId = pipeSlugId(params.slug);
    const url = APP_URL + `person/${personId}`;

    const t = await getTranslations('PersonMetadata');
    const [person, error] = await getPersonDetails(personId, {
      language: params.locale,
    });

    if (error) {
      return generateNotFoundMetadata({
        url,
        description: t('error', { personId }),
      });
    }

    const title = `${person.name} — CineRate`;
    const profileImageUrl = buildImagePath({ path: person.profile_path });
    // const themeColor = await getAverageColorFromUrl(profileImageUrl);
    const themeColor = '#ffffff';

    return {
      themeColor,
      title,
      openGraph: {
        title,
        url,
        type: 'website',
        images: profileImageUrl ?? '/og-image.png',
        description: person.biography,
      },
      twitter: {
        card: 'summary',
      },
    };
  };
}
