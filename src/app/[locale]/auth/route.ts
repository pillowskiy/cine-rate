import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { getRequestToken } from '#actions/getRequestToken';

function getTokenApproveURL(requestToken: string) {
  return (
    process.env.TMDB_URL +
    'authenticate/' +
    requestToken +
    `?redirect_to=${process.env.NEXT_PUBLIC_APP_URL}/auth/approve/`
  );
}

export async function GET({ url }: NextRequest) {
  try {
    if ((await cookies()).get('session_id')) {
      throw new Error('You are already authorized');
    }
    const data = await getRequestToken();
    return NextResponse.redirect(getTokenApproveURL(data.request_token));
  } catch (err) {
    return NextResponse.redirect(new URL('/', url));
  }
}
