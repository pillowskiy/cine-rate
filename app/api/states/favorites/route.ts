import { $api } from '@/app/_shared/api/api-interceptor';
import { MediaType } from '@config/enums';
import { ToggleResponse } from '@app/types/creation-types';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import { cookies } from 'next/headers';

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

    const { creationId, favorite, mediaType } = result.data;

    return $api.post<ToggleResponse>(`/3/account/account_id/favorite`, {
        media_id: creationId,
        media_type: mediaType,
        favorite,
    }, { params: { session_id: sessionId }})
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 })
        }).catch((err) => {
            if (!isAxiosError(err)) {
                return NextResponse.json('Unhandled error occurred', { status: 500 });
            }
            return NextResponse.json(err.response?.data, { status: err.status });
        });
}