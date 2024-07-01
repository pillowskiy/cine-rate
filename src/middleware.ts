import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/account'],
};

export async function middleware(request: NextRequest) {
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
