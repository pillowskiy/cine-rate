import { NextResponse } from 'next/server';
import { postSession } from '@actions/postSession';
import { getSessionUser } from '@actions/getSessionUser';
import zod from 'zod';
import { fetchErrorResponse } from '@libs/common/fetch';
import { SESSION_COOKIE_EXPIRES } from '@libs/common/next';

/*
 * https://github.com/vercel/next.js/issues/52799#issuecomment-1645124081
 */
export async function GET({
    url,
}: Request) {
    const { searchParams } = new URL(url);
    const requestToken = searchParams?.get('request_token');
    const parsedToken = zod.string().safeParse(requestToken);

    if (!parsedToken.success) {
        return NextResponse.json(
            {
                message: 'We cannot identify your tmdb token.',
            },
            { status: 400 }
        );
    }

    try {
        const session = await postSession(parsedToken.data);
        const user = await getSessionUser(session.session_id);
        const response = NextResponse.json(
            user,
            { status: 200 }
        );

        response.cookies.set('session_id', session.session_id, {
            httpOnly: true,
            sameSite: 'lax',
            expires: SESSION_COOKIE_EXPIRES()
        });

        return response;
    } catch (err) {
        // TEMP
        return fetchErrorResponse(err);
    }
}
