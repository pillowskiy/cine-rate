import { type NextRequest, NextResponse } from "next/server";
import { generateZodErrorsResponse } from "@libs/common/next";
import { getGenres } from "@actions/getGenres";
import { rejectFetch } from "@libs/common/fetch";
import { MediaType } from "@config/enums";
import zod from 'zod';

const queryDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
});

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
    const result = queryDto.safeParse(searchParams);

    if (!result.success) {
        return generateZodErrorsResponse(result);
    }

    const { mediaType, ...params } = result.data;
    const [genres, error] = await getGenres(mediaType, params);
    if (error) {
        return NextResponse.json(rejectFetch(error));
    }
    return NextResponse.json(genres, { status: 200 });
}