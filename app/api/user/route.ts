import { getSessionUser } from "@actions/getSessionUser";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;

    if (!sessionId) {
        return NextResponse.json({
            message: 'You must be logged in'
        }, { status: 403 })
    }

    return getSessionUser(sessionId)
        .then(({ data: user }) => {
            return NextResponse.json(user, { status: 200 });
        }).catch((err) => {
            if (!isAxiosError(err)) {
                return NextResponse.json(
                    {
                        message: 'Unhandled error occurred!',
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                {
                    message: err.message,
                },
                { status: err.response?.status }
            );
        })
}