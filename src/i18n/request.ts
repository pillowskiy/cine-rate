import { notFound } from 'next/navigation';
import {
  type GetRequestConfigParams,
  getRequestConfig,
} from 'next-intl/server';
import { locales } from '#config/localization';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  if (typeof locale !== 'string' || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
