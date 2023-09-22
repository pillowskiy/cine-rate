import { getSessionUser } from '@actions/getSessionUser';
import { $api } from '@/app/_shared/api/api-interceptor';
import { MediaType } from '@config/enums';
import { RatingResponse } from '@app/types/creation-types';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import zod from 'zod';
import { cookies } from 'next/headers';
import { INextPageParams } from '@/app/_types';
import { generateZodErrorsResponse } from '@/app/_libs/common/next';

const bodyDto = zod.object({
    value: zod.number().max(10).min(1)
});

const paramsDto = zod.object({
    creationId: zod.string().regex(/^\d+$/).transform(Number),
    mediaType: zod.nativeEnum(MediaType),
});

export async function POST(request: NextRequest, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const body = await request.json();
    const parsedBody = bodyDto.safeParse(body);
    if (!parsedBody.success) {
        return generateZodErrorsResponse(parsedBody);
    }

    const { mediaType, creationId } = parsedParams.data;

    return $api.post<RatingResponse>(`/3/${mediaType}/${creationId}/rating`, {
        value: parsedBody.data.value,
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

export async function Delete(_: NextRequest, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const { mediaType, creationId } = parsedParams.data;

    return $api.delete<RatingResponse>(`/3/${mediaType}/${creationId}/rating`, {
        params: { sesson_id: sessionId }
    })
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 })
        }).catch((err) => {
            if (!isAxiosError(err)) {
                return NextResponse.json('Unhandled error occurred', { status: 500 });
            }
            return NextResponse.json(err.response?.data, { status: err.status });
        });
}