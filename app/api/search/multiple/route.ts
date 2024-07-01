import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import { getMultiSearch } from '@actions/getMultiSearch';
import { fetchErrorResponse } from '@libs/common/fetch';
import { generateZodErrorsResponse } from '@libs/common/next';

const queryDto = zod.object({
  query: zod.string(),
});

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = queryDto.safeParse(searchParams);

  if (!result.success) {
    return generateZodErrorsResponse(result);
  }

  const [data, error] = await getMultiSearch(result.data.query);
  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(data, { status: 200 });
}
