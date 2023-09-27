import { NextResponse } from "next/server";
import { getLanguages } from "@actions/getLanguages";
import { rejectAxios } from "@libs/axios";

export async function GET() {
    return getLanguages()
        .then(({ data }) => {
            return NextResponse.json(data, { status: 200 });
        })
        .catch((err) => {
            return NextResponse.json(rejectAxios(err));
        });
}