import type { AccountStatesResponse } from "@app/types/creation-types";
import { MediaType } from "@config/enums";
import { rejectAxios } from "@libs/axios";
import { generateZodErrorsResponse } from "@libs/common/next";
import { INextPageParams } from "@/app/_types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { $api } from "@/app/_shared/api/api-interceptor";
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
        return generateZodErrorsResponse(parsedParams);
    }

    const { creationId, mediaType } = parsedParams.data

    return $api.get<AccountStatesResponse>(`/3/${mediaType}/${creationId}/account_states`)
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 });
        }).catch((err) => {
            return NextResponse.json(rejectAxios(err));
        });
}