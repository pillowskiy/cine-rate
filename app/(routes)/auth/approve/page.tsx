'use client';

import type { INextPageParams } from '@app/types/index';
import type { AuthApproveResponse } from '@app/types/auth-types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Button } from '@ui/button';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const statusDescription = {
  200: 'You have successfully authorized us to receive and modify your data through the TMDB service.',
  401: 'You or TMDB did not approve the request for your TMDB account information.',
  400: 'An error occurred during redirection.',
  default: 'An unhandled error occurred, please try again later.',
};

function isValidStatus(
  status: string | number
): status is keyof typeof statusDescription {
  return status in statusDescription;
}

function getStatusDescription(status: number) {
  return isValidStatus(status)
    ? statusDescription[status]
    : statusDescription.default;
}

interface ApproveData extends AuthApproveResponse {
  status: number;
}

/*
 * https://github.com/vercel/next.js/issues/52799#issuecomment-1645124081
 */

export default function ApprovePage({ searchParams }: INextPageParams) {
  const [data, setData] = useState<ApproveData | null>();

  useEffect(() => {
    axios
      .get<AuthApproveResponse>('/auth/approve/api', {
        params: searchParams,
        withCredentials: true,
      })
      .then((res) => setData({ message: res.data.message, status: res.status }))
      .catch((err) => {
        if (!isAxiosError(err) || !err.response) return;
        const { data, status } = err.response;
        setData({ message: data.message, status });
      });
  }, []);

  // TEMP
  if (!data) return null;

  return (
    <div className='grid place-items-center'>
      <Card>
        <CardHeader className='max-w-[550px]'>
          <CardTitle>{data.message}</CardTitle>
          <CardDescription>{getStatusDescription(data.status)}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href='/'>
            <Button>Back Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
