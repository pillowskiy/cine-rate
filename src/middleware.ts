import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';
import { IUser } from '#types/account-types';

export const config = {
  matcher: ['/account/:path*'],
};

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session_id');
  const sessionId = sessionCookie?.value;
  if (!sessionId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const sessionUser = await getSessionUser(sessionId).catch(() => null);
  if (!sessionUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

/**
 * @deprecated For some reason middleware can be called on client side
 */
function getSessionUser(sessionId: string) {
  return ky.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    cache: 'force-cache',
    headers: {
      Cookie: `session_id=${sessionId}`,
    },
    next: {
      tags: ['user'],
      revalidate: 3600 * 24,
    },
  });
}
