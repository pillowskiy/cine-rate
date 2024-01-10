import type { MediaType } from '@config/enums';
import { getCreationDetails } from '@actions/getCreationDetails';
import type { INextPageParams } from '@app/types/index';
import type { Metadata } from 'next';
import { buildImagePath } from '@libs/tmdb';
import { pipe } from '@libs/common/next';

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://cine-rate.vercel.app/';

export function generateCreationMetadata(mediaType: MediaType) {
  return async ({ params }: INextPageParams): Promise<Metadata> => {
    const creationId = pipe.strToInt(params.id);
    const url = APP_URL + `${mediaType}/${creationId}`;

    const [creation, error] = await getCreationDetails(creationId, mediaType);

    if (error) {
      return generateNotFoundMetadata({
        url,
        description: `🙈 Some creation with id ${creationId} that couldn't be found`,
      });
    }

    const { title, original_title } = creation;
    const assignTitleException =
      'original_name' in creation ? creation.original_name : 'Unknown';
    const creationTitle = title || original_title || assignTitleException;

    return {
      themeColor: '#F59E0B',
      title: `${creationTitle} — CineRate`,
      openGraph: {
        type: 'website',
        title: `${creationTitle} — CineRate`,
        images:
          buildImagePath({ path: creation.backdrop_path }) || '/og-image.png',
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
    themeColor: '#F59E0B',
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
