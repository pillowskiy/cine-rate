import type { MediaType } from '@config/enums';
import { getCreationDetails } from '@actions/getCreationDetails';
import type { INextPageParams } from '@app/types/index';
import type { Metadata } from 'next';
import { NextResponse } from 'next/server';
import { SafeParseError, ZodAny } from "zod";
import zod from 'zod';
import { buildImagePath } from '../tmdb';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://cine-rate.vercel.app/'

export const pipe = {
  string: (value: unknown) => zod.string().parse(value),
  int: (value: unknown) => zod.number().int().parse(value),
  strToInt: (value: unknown) => zod.string().regex(/^\d+$/).transform(Number).parse(value),
} as const;

export function generateZodErrorsResponse(result: SafeParseError<zod.infer<ZodAny>>) {
  if (result.error.issues.length) {
    return NextResponse.json(
      { errors: result.error.format()._errors },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: 'Unhandled zod error' },
    { status: 500 }
  );
}

// One month
export const SESSION_COOKIE_EXPIRES = () => Date.now() + 1000 * 3600 * 24 * 30;

export function generateCreationMetadata(mediaType: MediaType) {
  return (async ({ params }: INextPageParams): Promise<Metadata> => {
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
    const creationTitle = title || original_title || assignTitleException

    return {
      title: creationTitle,
      openGraph: {
        type: 'website',
        title: `CineRate - ${creationTitle}`,
        images: buildImagePath({ path: creation.backdrop_path }) || '/og-image.png',
        url,
        description: creation.overview,
      },
    }
  })
}

export function generateNotFoundMetadata({ url, ...ogMetadata }: NonNullable<Metadata['openGraph']> = {}): Metadata {
  return {
    title: `CineRate - Not Found`,
    openGraph: {
      type: 'website',
      title: 'CineRate',
      url: url || APP_URL,
      images: APP_URL + 'og-not-found.png',
      ...ogMetadata
    },
  }
}