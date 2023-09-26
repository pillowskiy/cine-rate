import { NextResponse, type NextRequest } from 'next/server';
import { getMultiSearch } from '@actions/getMultiSearch';
import { isAxiosError } from 'axios';
import zod from 'zod';

const queryDto = zod.object({
  query: zod.string(),
});

export function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = queryDto.safeParse(searchParams);

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

  return getMultiSearch(result.data.query)
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
