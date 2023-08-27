import { NextResponse } from 'next/server';
import { getRequestToken } from './_actions/get-request-token';

function getTokenApproveURL(requestToken: string) {
  return (
    process.env.TMDB_URL +
    'authenticate/' +
    requestToken +
    `?redirect_to=${process.env.APP_URL}/auth/approve`
  );
}

export async function GET() {
  try {
    const { data } = await getRequestToken();
    if (!data.success) throw null;
    return NextResponse.redirect(getTokenApproveURL(data.request_token));
  } catch (err) {
    return NextResponse.redirect('/');
  }
}
