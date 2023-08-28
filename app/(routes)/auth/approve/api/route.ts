import type { AuthApproveResponse } from '@app/types/auth-types';
import { NextResponse } from 'next/server';
import { postSession } from '@actions/postSession';
import { isAxiosError } from 'axios';

/*
 * https://github.com/vercel/next.js/issues/52799#issuecomment-1645124081
 */
export async function GET({
  url,
}: Request): Promise<NextResponse<AuthApproveResponse>> {
  const { searchParams } = new URL(url);
  const requestToken = searchParams?.get('request_token');
  if (!requestToken) {
    return NextResponse.json(
      {
        message: 'We cannot identify your tmdb token.',
      },
      { status: 400 }
    );
  }

  try {
    const { data } = await postSession(requestToken);
    const response = NextResponse.json(
      {
        message: 'You have submitted an approval.',
      },
      { status: 200 }
    );
    response.cookies.set('session_id', data.session_id, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return response;
  } catch (err) {
    if (!isAxiosError(err)) {
      return NextResponse.json(
        {
          message: 'Unhandled error occurred!',
        },
        { status: 500 }
      );
    }

    if (err.response?.status === 401) {
      return NextResponse.json(
        {
          message: 'The approval was denied.',
        },
        { status: err.response?.status }
      );
    }

    return NextResponse.json(
      {
        message: err.message,
      },
      { status: err.response?.status }
    );
  }
}
