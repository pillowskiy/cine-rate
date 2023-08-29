import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/profile'],
};

export async function middleware(request: NextRequest) {
  // TEMP: handle server side user store instead of request
  const sessionCookie = request.cookies.get('session_id');

  if (!sessionCookie) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'authentication failed',
      }),
      { status: 401 }
    );
  }
}
