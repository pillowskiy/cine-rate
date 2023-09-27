import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateZodErrorsResponse } from '@libs/common/next';
import { rejectAxios } from '@libs/axios';
import { $api } from '@/app/_shared/api/api-interceptor';
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

    return $api.post<ToggleResponse>(`/3/account/account_id/favorite`, {
        media_id: creationId,
        media_type: mediaType,
        favorite,
    }, { params: { session_id: sessionId } })
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 })
        })
        .catch((err) => {
            return NextResponse.json(rejectAxios(err));
        });
}