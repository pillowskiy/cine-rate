import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import type { CreationsResponse } from '#types/creation-types';
import type { INextPageParams } from '#types/index';
import { ResourceTarget, ResourceType } from '#config/enums';
import { $api } from '#api/api-interceptor';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { type Pagination, paginationDto } from '../../../dto';

const paramsDto = zod.object({
  resourceType: zod.nativeEnum(ResourceType),
  resourceTarget: zod.nativeEnum(ResourceTarget),
});

export async function GET(request: NextRequest, props: INextPageParams) {
  const params = await props.params;
  const sessionCookie = (await cookies()).get('session_id');
  const sessionId = sessionCookie?.value;

  if (!sessionId) {
    return NextResponse.json(
      {
        message: 'Only authorized users can do this action.',
      },
      { status: 401 }
    );
  }

  const paramsParsed = paramsDto.safeParse(params);

  if (!paramsParsed.success) {
    return generateZodErrorsResponse(paramsParsed);
  }

  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const pagination = paginationDto.safeParse(searchParams);

  if (!pagination.success) {
    return generateZodErrorsResponse(pagination);
  }

  const { resourceTarget, resourceType } = paramsParsed.data;

  return $api
    .fetch<CreationsResponse, Pagination>(
      `/account/account_id/${resourceTarget}/${resourceType}`,
      {
        params: pagination.data,
      }
    )
    .then((data) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      return fetchErrorResponse(error);
    });
}
