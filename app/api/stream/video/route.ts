import { type NextRequest, NextResponse } from 'next/server';
import { rejectAxios } from '@libs/axios';
import { generateZodErrorsResponse } from '@libs/common/next';
import { getInfo as getVideoInfo, chooseFormat } from 'ytdl-core';
import zod from 'zod';

const queryDto = zod.object({
    url: zod.string().url(),
})

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const searchParams = requestUrl.searchParams.entries();
    const searchParamsObj = Object.fromEntries(searchParams);
    const parsedQuery = queryDto.safeParse(searchParamsObj);

    if (!parsedQuery.success) {
        return generateZodErrorsResponse(parsedQuery);
    }

    return getVideoInfo(parsedQuery.data.url).then(info => {
        const format = chooseFormat(info.formats, { quality: 'highestvideo' });
        // TEMP: correctly json object
        return NextResponse.json(format, { status: 200 });
    }).catch(err => {
        return NextResponse.json(rejectAxios(err));
    });
}