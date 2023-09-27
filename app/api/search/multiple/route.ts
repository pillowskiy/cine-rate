import { NextResponse, type NextRequest } from 'next/server';
import { rejectAxios } from '@libs/axios';
import { generateZodErrorsResponse } from '@libs/common/next';
import { getMultiSearch } from '@actions/getMultiSearch';
import zod from 'zod';

const queryDto = zod.object({
  query: zod.string(),
});

export function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = queryDto.safeParse(searchParams);

  if (!result.success) {
    return generateZodErrorsResponse(result);
  }

  return getMultiSearch(result.data.query)
    .then(({ data }) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((err) => {
      return NextResponse.json(rejectAxios(err));
    });
}
