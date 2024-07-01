import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import { INextPageParams } from '#types/index';
import { getDiscover } from '#actions/getDiscover';
import { MovieSort, TVSort } from '#config/enums';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

const filterDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
  'certification.gte': zod.string().optional(),
  'certification.lte': zod.string().optional(),
  'primary_release_date.gte': zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  'primary_release_date.lte': zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  'release_date.gte': zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  'release_date.lte': zod
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  'vote_average.gte': zod.string().regex(/^\d+$/).transform(Number).optional(),
  'vote_average.lte': zod.string().regex(/^\d+$/).transform(Number).optional(),
  'vote_count.gte': zod.string().regex(/^\d+$/).transform(Number).optional(),
  'vote_count.lte': zod.string().regex(/^\d+$/).transform(Number).optional(),
  certification: zod.string().optional(),
  certification_country: zod.string().optional(),
  include_adult: zod
    .string()
    .regex(/^(true|false)$/i)
    .transform(Boolean)
    .optional(),
  include_video: zod
    .string()
    .regex(/^(true|false)$/i)
    .transform(Boolean)
    .optional(),
  language: zod.string().optional(),
  primary_release_year: zod
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional(),
  region: zod.string().optional(),
  sort_by: zod.nativeEnum(MovieSort).or(zod.nativeEnum(TVSort)).optional(),
  watch_region: zod.string().optional(),
  with_genres: zod.string().optional(),
  year: zod.number().optional(),
});

export async function GET(request: NextRequest, { params }: INextPageParams) {
  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const parsedQuery = filterDto.safeParse(searchParams);
  if (!parsedQuery.success) {
    return generateZodErrorsResponse(parsedQuery);
  }

  return getDiscover(parsedParams.data.mediaType, parsedQuery.data)
    .then((data) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      return fetchErrorResponse(error);
    });
}
