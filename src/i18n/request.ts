import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '#config/localization';

export default getRequestConfig(async ({ locale: nativeLocale }) => {
  const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
  const locale = cookieLocale || nativeLocale || defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
