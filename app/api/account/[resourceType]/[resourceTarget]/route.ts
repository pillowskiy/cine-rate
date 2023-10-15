import type { CreationsResponse } from "@app/types/creation-types";
import type { INextPageParams } from "@app/types/index";
import { type NextRequest, NextResponse } from "next/server";
import { type Pagination, paginationDto } from "../../../dto";
import { generateZodErrorsResponse } from "@libs/common/next";
import { cookies } from "next/headers";
import { $api } from "@api/api-interceptor";
import { fetchErrorResponse } from "@libs/common/fetch";

import { ResourceTarget, ResourceType } from '@config/enums';
import zod from 'zod';

const paramsDto = zod.object({
    resourceType: zod.nativeEnum(ResourceType),
    resourceTarget: zod.nativeEnum(ResourceTarget),
})

export function GET(request: NextRequest, { params }: INextPageParams) {
    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;

    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action.'
        }, { status: 401 });
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

    return $api.fetch<
        CreationsResponse, Pagination
    >(`/3/account/account_id/${resourceTarget}/${resourceType}`, {
        params: pagination.data
    }).then(data => {
        return NextResponse.json(data, { status: 200 });
    }).catch((error) => {
        return fetchErrorResponse(error);
    });
}