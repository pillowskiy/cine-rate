import { notFound } from 'next/navigation';
import {
  type GetRequestConfigParams,
  getRequestConfig,
} from 'next-intl/server';
import path from 'path';
import { locales } from '#config/localization';

export default getRequestConfig(async () => {
  const locale = 'en-US';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
