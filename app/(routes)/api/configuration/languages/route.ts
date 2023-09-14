import { NextResponse } from "next/server";
import { getLanguages } from "@actions/getLanguages";
import { isAxiosError } from "axios";

export async function GET() {
    return getLanguages()
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 });
        })
        .catch((err) => {
            if (!isAxiosError(err)) {
                return NextResponse.json('Unhandled error occurred', { status: 500 });
            }
            return NextResponse.json(err.response?.data, { status: err.status });
        });
}