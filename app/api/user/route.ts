import { fetchErrorResponse } from "@libs/common/fetch";
import { getSessionUser } from "@actions/getSessionUser";
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

    return getSessionUser(sessionId).then((user) => {
        return NextResponse.json(user, { status: 200 });
    }).catch((error) => {
        return fetchErrorResponse(error);
    });
}