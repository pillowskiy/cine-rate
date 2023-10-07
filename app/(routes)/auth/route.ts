import { type NextRequest, NextResponse } from 'next/server';
import { getRequestToken } from '@actions/getRequestToken';
import { cookies } from 'next/headers';

function getTokenApproveURL(requestToken: string) {
  return (
    process.env.TMDB_URL +
    'authenticate/' +
    requestToken +
    `?redirect_to=${process.env.APP_URL}/auth/approve/`
  );
}

export async function GET({ url }: NextRequest) {
  try {
    if (cookies().get('session_id')) {
      throw new Error('You are already authorized');
    }
    const data = await getRequestToken();
    return NextResponse.redirect(getTokenApproveURL(data.request_token));
  } catch (err) {
    return NextResponse.redirect(new URL('/', url));
  }
}
