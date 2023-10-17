import type { INextPageParams } from '@app/types/index';
import { NextResponse } from 'next/server';
import { getInfo as getVideoInfo, chooseFormat } from 'ytdl-core';
import { generateZodErrorsResponse } from '@libs/common/next';
import { getCreationVideos } from '@actions/getCreationVideos';
import { inferOfficialTrailer } from '@libs/tmdb';
import { buildURL } from '@libs/ytdl';
import { paramsDto } from '../dto';

export async function GET(_: unknown, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const { mediaType, creationId } = parsedParams.data;
    const [videos, error] = await getCreationVideos(creationId, mediaType);

    if (error) {
        return NextResponse.json({
            message: "Uh, Oh! Something went wrong."
        }, { status: error.status });
    }

    const officialTrailer = inferOfficialTrailer(videos);

    if (!officialTrailer) {
        return NextResponse.json({
            message: "Couldn't track down a trailer for this one."
        }, { status: 404 });
    }

    const videoURL = buildURL(officialTrailer.key);
    return getVideoInfo(videoURL).then(info => {
        const format = chooseFormat(info.formats, { quality: 'highestvideo' });
        // TEMP: correctly json object
        return NextResponse.json({ details: info.videoDetails, format }, { status: 200 });
    }).catch(err => {
        if (err instanceof Error) {
            return NextResponse.json({
                message: err.message
            }, { status: 400 });
        }
        return NextResponse.json({ message: 'Unhandled error occurred!' }, { status: 500 });
    });
}