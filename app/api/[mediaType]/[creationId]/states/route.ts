import type { AccountStatesResponse } from "@app/types/creation-types";
import { generateZodErrorsResponse } from "@libs/common/next";
import { INextPageParams } from "@/app/_types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { $api } from "@api/api-interceptor";
import { fetchErrorResponse } from "@libs/common/fetch";

import { paramsDto } from "../dto";
import zod from 'zod';

export async function GET(_: unknown, { params }: INextPageParams) {
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

    const [data, error] = await $api.safeFetch<AccountStatesResponse>(`/3/${mediaType}/${creationId}/account_states`);
    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(data, { status: 200 });
}