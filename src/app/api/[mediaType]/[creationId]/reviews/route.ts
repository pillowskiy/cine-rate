import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import type { INextPageParams } from '#types/index';
import { getCreationReviews } from '#actions/getCreationReviews';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

const queryDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
});

export async function GET(request: NextRequest, props: INextPageParams) {
  const params = await props.params;
  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const requestUrl = new URL(request.url);
  const searchParamsObj = Object.fromEntries(requestUrl.searchParams.entries());

  const parsedQuery = queryDto.safeParse(searchParamsObj);
  if (!parsedQuery.success) {
    return generateZodErrorsResponse(parsedQuery);
  }

  const { mediaType, creationId } = parsedParams.data;

  return getCreationReviews(creationId, mediaType, parsedQuery.data)
    .then((data) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      return fetchErrorResponse(error);
    });
}
