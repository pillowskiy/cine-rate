import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSessionUser } from '#actions/getSessionUser';
import { fetchErrorResponse } from '#libs/common/fetch';

export async function GET() {
  const sessionCookie = (await cookies()).get('session_id');
  const sessionId = sessionCookie?.value;

  if (!sessionId) {
    return NextResponse.json(
      {
        message: 'You must be logged in',
      },
      { status: 403 }
    );
  }

  return getSessionUser(sessionId)
    .then((user) => {
      return NextResponse.json(user, { status: 200 });
    })
    .catch((error) => {
      return fetchErrorResponse(error);
    });
}

export async function DELETE() {
  const sessionCookie = (await cookies()).get('session_id');
  const sessionId = sessionCookie?.value;

  if (!sessionId) {
    return NextResponse.json(
      {
        message: 'You must be logged in',
      },
      { status: 403 }
    );
  }

  revalidateTag('user');

  (await cookies()).delete('session_id');
  const success = !(await cookies()).get('session_id')?.value;
  return NextResponse.json(success, { status: 200 });
}
