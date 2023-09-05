import { type NextRequest, NextResponse } from 'next/server';
import { $api } from '@/app/_shared/api/api-interceptor';
import { SeasonDetailsResponse } from '@app/types/tv-types';
import { INextPageParams, MediaType } from '@app/types/index';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest, route: INextPageParams) {
  const seriesId = +(route.params?.id.toString() || NaN);

  if (!seriesId) {
    NextResponse.json(
      { message: 'Series id must be an integer number' },
      { status: 400 }
    );
  }

  const requestUrl = new URL(request.url);
  const seasonNumber = requestUrl.searchParams.get('season') || 1;

  return $api
    .get<SeasonDetailsResponse>(
      `/3/${MediaType.TV}/${seriesId}/season/${seasonNumber}`
    )
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
