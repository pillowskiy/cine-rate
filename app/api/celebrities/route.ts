import { type NextRequest, NextResponse } from 'next/server';
import { MediaType } from '@config/enums';
import { getPopular } from '@actions/getPopular';
import { generateZodErrorsResponse } from '@libs/common/next';
import { rejectAxios } from '@libs/axios';
import zod from 'zod';

const filterDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
});

export function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = filterDto.safeParse(searchParams);

  if (!result.success) {
    return generateZodErrorsResponse(result);
  }

  const { page } = result.data;
  return getPopular(MediaType.Person, { page: page.toString() })
    .then(({ data }) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((err) => {
      return NextResponse.json(rejectAxios(err));
    });
}
