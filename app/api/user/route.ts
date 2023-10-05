import { rejectFetch } from "@/app/_libs/common/fetch";
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

    const [user, error] = await getSessionUser(sessionId);

    if (error) {
        return NextResponse.json(rejectFetch(error))
    }
    return NextResponse.json(user, { status: 200 });
}