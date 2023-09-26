import { getGenres } from "@actions/getGenres";
import { MediaType } from "@config/enums";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import zod from 'zod';

const queryDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
});

export function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
    const result = queryDto.safeParse(searchParams);

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
    const { mediaType, ...params } = result.data;
    return getGenres(mediaType, params)
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 });
        })
        .catch((err) => {
            if (!isAxiosError(err)) {
                return NextResponse.json('Unhandled error occurred', { status: 500 });
            }
            return NextResponse.json(err.response?.data, { status: err.status });
        });
}