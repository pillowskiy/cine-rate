import { type NextRequest, NextResponse } from 'next/server';
import { getPopular } from '@actions/getPopular';
import { MediaType } from '@config/enums';
import { fetchErrorResponse } from '@libs/common/fetch';
import { generateZodErrorsResponse } from '@libs/common/next';
import { paginationDto } from '../dto';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = paginationDto.safeParse(searchParams);

  if (!result.success) {
    return generateZodErrorsResponse(result);
  }

  const [data, error] = await getPopular(MediaType.Person, {
    page: result.data.page.toString(),
  });

  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(data, { status: 200 });
}
