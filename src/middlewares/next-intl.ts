import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '#config/localization';
import type { AppMiddleware } from './common/types';

export const handler: AppMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});
