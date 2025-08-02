'use client';

import { useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { INextPageParams } from '#types/index';
import { useUserStore } from '#store/user';
import { useToast } from '#ui/use-toast';
import Loader from '#components/loader';
import { pipe } from '#libs/common/next';

const availableStatuses = [200, 401, 400] as const;

/*
 * https://github.com/vercel/next.js/issues/52799#issuecomment-1645124081
 */
export default function ApprovePage(props: INextPageParams) {
  const searchParams = use(props.searchParams);
  const t = useTranslations('AuthApprove');
  const tt = useTranslations('Toast');

  const requestToken = pipe.string(searchParams?.request_token);
  const { toast } = useToast();

  const router = useRouter();
  const userStore = useUserStore();

  const getStatusDescription = useCallback((status: number) => {
    const isValidStatus = availableStatuses.includes(status as any);
    const statusKey = isValidStatus ? status.toString() : 'default';
    return `statusDescription.${statusKey}` as Parameters<typeof t>[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userStore
      .approve(requestToken)
      .then(() => {
        toast({
          title: tt('authApprove.title'),
          description: tt('authApprove.description'),
        });
      })
      .catch((error) => {
        toast({
          title: tt('error.title'),
          description: tt('error.description', {
            error: t(getStatusDescription(error?.status || 500)),
          }),
        });
      })
      .finally(() => {
        router.replace('/');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
}
