import { NextResponse, type NextRequest } from 'next/server';
import { generateZodErrorsResponse } from '@libs/common/next';
import { rejectFetch } from '@libs/common/fetch';
import { getMultiSearch } from '@actions/getMultiSearch';
import zod from 'zod';

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
    return NextResponse.json(rejectFetch(error));
  }
  return NextResponse.json(data, { status: 200 });
}
