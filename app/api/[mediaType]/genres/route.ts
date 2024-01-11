import { type NextRequest, NextResponse } from "next/server";
import type { INextPageParams } from "@app/types/index";
import { generateZodErrorsResponse } from "@libs/common/next";
import { getGenres } from "@actions/getGenres";
import { fetchErrorResponse } from "@libs/common/fetch";
import { paramsDto } from "../dto";

export async function GET(request: NextRequest, { params }: INextPageParams) {
    const requestUrl = new URL(request.url);
    const searchParams = Object.fromEntries(requestUrl.searchParams.entries());

    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const { mediaType } = parsedParams.data;
    const [genres, error] = await getGenres(mediaType, searchParams);
    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(genres, { status: 200 });
}