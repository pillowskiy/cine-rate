import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '#config/localization';

export default getRequestConfig(async ({ locale }: { locale: unknown }) => {
  if (typeof locale !== 'string' || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
