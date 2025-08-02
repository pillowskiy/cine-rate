import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import type { RatingResponse } from '#types/creation-types';
import type { INextPageParams } from '#types/index';
import { $api } from '#api/api-interceptor';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

const bodyDto = zod.object({
  value: zod.number().max(10).min(1),
});

export async function POST(request: NextRequest, props: INextPageParams) {
  const params = await props.params;
  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const sessionCookie = (await cookies()).get('session_id');
  const sessionId = sessionCookie?.value;
  if (!sessionId) {
    return NextResponse.json(
      {
        message: 'Only authorized users can do this action',
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  const parsedBody = bodyDto.safeParse(body);
  if (!parsedBody.success) {
    return generateZodErrorsResponse(parsedBody);
  }

  const { mediaType, creationId } = parsedParams.data;

  return $api
    .fetch<RatingResponse>(`/${mediaType}/${creationId}/rating`, {
      method: 'POST',
      body: JSON.stringify(parsedBody.data),
      params: { session_id: sessionId },
    })
    .then((data) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      return fetchErrorResponse(error);
    });
}

export async function DELETE(_: NextRequest, props: INextPageParams) {
  const params = await props.params;
  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const sessionCookie = (await cookies()).get('session_id');
  const sessionId = sessionCookie?.value;
  if (!sessionId) {
    return NextResponse.json(
      {
        message: 'Only authorized users can do this action',
      },
      { status: 401 }
    );
  }

  const { mediaType, creationId } = parsedParams.data;

  const [data, error] = await $api.safeFetch<RatingResponse>(
    `/${mediaType}/${creationId}/rating`,
    {
      method: 'DELETE',
      params: { sesson_id: sessionId },
    }
  );

  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(data, { status: 200 });
}
