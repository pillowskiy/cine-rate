import { type NextRequest, NextResponse } from 'next/server';
import type { INextPageParams } from '@app/types/index';
import type { ReviewResponse } from '@app/types/review-types';
import { generateZodErrorsResponse } from '@libs/common/next';
import { $api } from '@api/api-interceptor';
import { fetchErrorResponse } from '@libs/common/fetch';
import zod from 'zod';
import { paramsDto } from '../dto';

const queryDto = zod.object({
    page: zod.string().regex(/^\d+$/).transform(Number),
});

export async function GET(request: NextRequest, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const requestUrl = new URL(request.url);
    const searchParamsObj = Object.fromEntries(requestUrl.searchParams.entries());

    const parsedQuery = queryDto.safeParse(searchParamsObj);
    if (!parsedQuery.success) {
        return generateZodErrorsResponse(parsedQuery);
    }

    const { mediaType, creationId } = parsedParams.data;

    return $api.fetch<ReviewResponse>(`/${mediaType}/${creationId}/reviews`, {
        method: 'GET',
        params: parsedQuery.data,
    }).then((data) => {
        return NextResponse.json(data, { status: 200 });
    }).catch((error) => {
        return fetchErrorResponse(error);
    });
}