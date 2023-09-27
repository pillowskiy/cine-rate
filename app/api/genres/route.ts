import { type NextRequest, NextResponse } from "next/server";
import { rejectAxios } from "@libs/axios";
import { generateZodErrorsResponse } from "@libs/common/next";
import { getGenres } from "@actions/getGenres";
import { MediaType } from "@config/enums";
import zod from 'zod';

const queryDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
});

export function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
    const result = queryDto.safeParse(searchParams);

    if (!result.success) {
        return generateZodErrorsResponse(result);
    }

    const { mediaType, ...params } = result.data;
    return getGenres(mediaType, params)
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(rejectAxios(err));
        });
}