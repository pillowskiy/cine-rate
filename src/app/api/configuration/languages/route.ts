import { NextResponse } from 'next/server';
import { getLanguages } from '#actions/getLanguages';
import { fetchErrorResponse } from '#libs/common/fetch';

export const dynamic = 'force-static';
export const revalidate = 3600 * 24;

export async function GET() {
  const [data, error] = await getLanguages();
  if (error) {
    return fetchErrorResponse(error);
  }
  return NextResponse.json(data, { status: 200 });
}
