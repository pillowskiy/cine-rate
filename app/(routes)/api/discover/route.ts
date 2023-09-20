import { getDiscover } from '@/app/_shared/actions/getDiscover';
import { MediaType, TVSort, MovieSort } from '@config/enums';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import zod from 'zod';

const filterDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
  mediaType: zod.nativeEnum(MediaType),
  "certification.gte": zod.string().optional(),
  "certification.lte": zod.string().optional(),
  "primary_release_date.gte": zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  "primary_release_date.lte": zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  "release_date.gte": zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  "release_date.lte": zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  "vote_average.gte": zod.string().regex(/^\d+$/).transform(Number).optional(),
  "vote_average.lte": zod.string().regex(/^\d+$/).transform(Number).optional(),
  "vote_count.gte": zod.string().regex(/^\d+$/).transform(Number).optional(),
  "vote_count.lte": zod.string().regex(/^\d+$/).transform(Number).optional(),
  certification: zod.string().optional(),
  certification_country: zod.string().optional(),
  include_adult: zod.string().regex(/^(true|false)$/i).transform(Boolean).optional(),
  include_video: zod.string().regex(/^(true|false)$/i).transform(Boolean).optional(),
  language: zod.string().optional(),
  primary_release_year: zod.string().regex(/^\d+$/).transform(Number).optional(),
  region: zod.string().optional(),
  sort_by: zod.nativeEnum(MovieSort).or(zod.nativeEnum(TVSort)).optional(),
  watch_region: zod.string().optional(),
  with_genres: zod.string().optional(),
  year: zod.number().optional(),
});

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = filterDto.safeParse(searchParams);

  if (!result.success) {
    if (result.error.issues.length) {
      return NextResponse.json(
        { errors: result.error.format() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Unhandled zod error' },
      { status: 500 }
    );
  }
  const { mediaType, ...params } = result.data;

  return getDiscover(mediaType, params)
    .then(({ data }) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((err) => {
      if (!isAxiosError(err)) {
        return NextResponse.json('Unhandled error occurred', { status: 500 });
      }
      return NextResponse.json(err.response?.data, { status: err.status });
    });
}
