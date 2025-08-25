import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import zod from 'zod';
import type { AccountStatesResponse } from '#types/creation-types';
import type { INextPageParams } from '#types/index';
import { $api } from '#api/api-interceptor';
import { fetchErrorResponse } from '#libs/common/fetch';
import { generateZodErrorsResponse } from '#libs/common/next';
import { paramsDto } from '../dto';

export async function GET(_: unknown, props: INextPageParams) {
  const params = await props.params;
  const sessionCookie = (await cookies()).get('session_id')?.value;
  const parsedSessionId = zod.string().safeParse(sessionCookie);

  if (!parsedSessionId.success) {
    return NextResponse.json(
      {
        message: 'Only authorized users can do this action',
      },
      { status: 401 }
    );
  }

  const parsedParams = paramsDto.safeParse(params);
  if (!parsedParams.success) {
    return generateZodErrorsResponse(parsedParams);
  }

  const { creationId, mediaType } = parsedParams.data;

  const [data, error] = await $api.safeFetch<AccountStatesResponse>(
    `/${mediaType}/${creationId}/account_states`
  );
  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(data, { status: 200 });
}
