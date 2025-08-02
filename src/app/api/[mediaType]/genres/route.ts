import { type NextRequest, NextResponse } from 'next/server';
import type { INextPageParams } from '#types/index';
import { getGenres } from '#actions/getGenres';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

export const dynamic = 'force-static';
export const revalidate = 84900;

export async function GET(request: NextRequest, props: INextPageParams) {
  const params = await props.params;
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());

  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const { mediaType } = parsedParams.data;
  const [genres, error] = await getGenres(mediaType, searchParams);
  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(genres, { status: 200 });
}
