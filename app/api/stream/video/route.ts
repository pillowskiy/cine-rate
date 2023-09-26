import { generateZodErrorsResponse } from '@/app/_libs/common/next';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
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
        if (!(err instanceof Error)) {
            return NextResponse.json({ message: 'Unhandled error occurred' }, { status: 500 });
        }
        return NextResponse.json({ message: err.message }, { status: 401 });
    });
}