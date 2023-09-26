import { MediaType } from "@/app/_config/enums";
import { $api } from "@/app/_shared/api/api-interceptor";
import { INextPageParams } from "@/app/_types";
import { AccountStatesResponse } from "@/app/_types/creation-types";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import zod from 'zod';

const paramsDto = zod.object({
    creationId: zod.string().regex(/^\d+$/).transform(Number),
    mediaType: zod.nativeEnum(MediaType),
})

export function GET(_: unknown, { params }: INextPageParams) {
    const sessionCookie = cookies().get('session_id')?.value;
    const parsedSessionId = zod.string().safeParse(sessionCookie);

    if (!parsedSessionId.success) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 });
    }

    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        if (parsedParams.error.issues.length) {
            return NextResponse.json(
                { errors: parsedParams.error.format() },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: 'Unhandled zod error' },
            { status: 500 }
        );
    }

    const { creationId, mediaType } = parsedParams.data

    return $api.get<AccountStatesResponse>(`/3/${mediaType}/${creationId}/account_states`).then(({ data }) => {
        return NextResponse.json(data, { status: 200 });
    }).catch((err) => {
        if (!isAxiosError(err)) {
            return NextResponse.json({ message: 'Unhandled error occurred' }, { status: 500 });
        }
        return NextResponse.json(err.response?.data, { status: err.status });
    });
}