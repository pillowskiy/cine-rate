import { type NextRequest, NextResponse } from 'next/server';
import { MediaType } from '@config/enums';
import { getPopular } from '@actions/getPopular';
import { rejectFetch } from '@libs/common/fetch';
import { generateZodErrorsResponse } from '@libs/common/next';
import zod from 'zod';

const filterDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
});

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = filterDto.safeParse(searchParams);

  if (!result.success) {
    return generateZodErrorsResponse(result);
  }

  const [data, error] = await getPopular(MediaType.Person, {
    page: result.data.page.toString()
  });

  if(error) {
    return NextResponse.json(rejectFetch(error));
  }
  return NextResponse.json(data, { status: 200 });
}
