import { type NextRequest, NextResponse } from "next/server";
import type { INextPageParams } from "@app/types/index";
import { generateZodErrorsResponse } from "@libs/common/next";
import { getGenres } from "@actions/getGenres";
import { fetchErrorResponse } from "@libs/common/fetch";
import { MediaType } from "@config/enums";
import zod from 'zod';

const queryDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
});

export async function GET(request: NextRequest, { params }: INextPageParams) {
    const requestUrl = new URL(request.url);
    const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
    const result = queryDto.safeParse(params);

    if (!result.success) {
        return generateZodErrorsResponse(result);
    }

    const { mediaType } = result.data;
    const [genres, error] = await getGenres(mediaType, searchParams);
    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(genres, { status: 200 });
}