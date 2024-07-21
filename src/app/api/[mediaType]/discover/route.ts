import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import { INextPageParams } from '#types/index';
import { getDiscover } from '#actions/getDiscover';
import { MovieSort, TVSort } from '#config/enums';
import {
  NUMERIC_REGEXP,
  STRINGIFY_BOOLEAN_REGEXP,
  TMDB_DATE_STRING_REGEXP,
} from '#config/regexp';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

const filterDto = zod.object({
  page: zod.string().regex(NUMERIC_REGEXP).transform(Number),
  'certification.gte': zod.string().optional(),
  'certification.lte': zod.string().optional(),
  'primary_release_date.gte': zod
    .string()
    .regex(TMDB_DATE_STRING_REGEXP)
    .optional(),
  'primary_release_date.lte': zod
    .string()
    .regex(TMDB_DATE_STRING_REGEXP)
    .optional(),
  'release_date.gte': zod.string().regex(TMDB_DATE_STRING_REGEXP).optional(),
  'release_date.lte': zod.string().regex(TMDB_DATE_STRING_REGEXP).optional(),
  'vote_average.gte': zod
    .string()
    .regex(NUMERIC_REGEXP)
    .transform(Number)
    .optional(),
  'vote_average.lte': zod
    .string()
    .regex(NUMERIC_REGEXP)
    .transform(Number)
    .optional(),
  'vote_count.gte': zod
    .string()
    .regex(NUMERIC_REGEXP)
    .transform((out) => (out ? Number(out) : 300))
    .optional(),
  'vote_count.lte': zod
    .string()
    .regex(NUMERIC_REGEXP)
    .transform(Number)
    .optional(),
  certification: zod.string().optional(),
  certification_country: zod.string().optional(),
  include_adult: zod
    .string()
    .regex(STRINGIFY_BOOLEAN_REGEXP)
    .transform(Boolean)
    .optional(),
  include_video: zod
    .string()
    .regex(STRINGIFY_BOOLEAN_REGEXP)
    .transform(Boolean)
    .optional(),
  language: zod.string().optional(),
  primary_release_year: zod
    .string()
    .regex(NUMERIC_REGEXP)
    .transform(Number)
    .optional(),
  region: zod.string().optional(),
  sort_by: zod
    .nativeEnum(MovieSort)
    .or(zod.nativeEnum(TVSort))
    .optional()
    .transform((sort) => sort && sortMapping[sort]),
  watch_region: zod.string().optional(),
  with_genres: zod.string().optional(),
  year: zod.number().optional(),
});

const movieSortMapping = {
  [MovieSort.Popular]: 'popularity.desc',
  [MovieSort.TopRated]: 'vote_average.desc',
  [MovieSort.Upcoming]: 'primary_release_date.asc',
  [MovieSort.NowPlaying]: 'primary_release_date.asc',
};

const tvSortMapping = {
  [TVSort.Popular]: 'popularity.desc',
  [TVSort.TopRated]: 'vote_average.desc',
  [TVSort.OnTheAir]: 'primary_release_date.asc',
  [TVSort.AiringToday]: 'primary_release_date.desc',
};

const sortMapping = {
  ...movieSortMapping,
  ...tvSortMapping,
};

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
