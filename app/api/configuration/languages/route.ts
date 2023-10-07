import { NextResponse } from "next/server";
import { getLanguages } from "@actions/getLanguages";
import { fetchErrorResponse } from "@libs/common/fetch";

export async function GET() {
    const [data, error] = await getLanguages();
    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(data, { status: 200 });
}