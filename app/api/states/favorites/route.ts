import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateZodErrorsResponse } from '@libs/common/next';
import { $api } from '@api/api-interceptor';
import { fetchErrorResponse } from '@libs/common/fetch';
import { MediaType } from '@config/enums';
import type { ToggleResponse } from '@app/types/creation-types';
import zod from 'zod';

const bodyDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
    creationId: zod.number(),
    favorite: zod.boolean(),
});

export async function POST(request: NextRequest) {
    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const body = await request.json();
    const result = bodyDto.safeParse(body);
    if (!result.success) {
        return generateZodErrorsResponse(result);
    }

    const { creationId, favorite, mediaType } = result.data;

    const [data, error] = await $api.safeFetch<ToggleResponse>(`/3/account/account_id/favorite`, {
        params: { session_id: sessionId },
        body: JSON.stringify({
            media_id: creationId,
            media_type: mediaType,
            favorite,
        }),
        method: 'POST',
    });

    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(data, { status: 201 })
}