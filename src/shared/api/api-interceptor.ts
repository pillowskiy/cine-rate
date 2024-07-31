import { cookies } from 'next/headers';
import 'server-only';
import { defaultLocale } from '#config/localization';
import { createFetchInterceptor } from '#libs/common/fetch';

const { TMDB_API_URL, TMDB_ACCESS_TOKEN, TMDB_API_VERSION = '3' } = process.env;

export const getNextLocale = () => {
  const localeCookie = cookies().get('NEXT_LOCALE');
  const locale = localeCookie?.value;
  return locale ?? defaultLocale;
};

export const $api = createFetchInterceptor(
  new URL(TMDB_API_VERSION, TMDB_API_URL),
  {
    credentials: 'include',
    mode: 'cors',
  }
);

$api.request.use((config) => {
  config.params = { ...config.params, language: getNextLocale() };
  const newHeaders = new Headers(config.headers);
  newHeaders.set('Accept', 'application/json');
  newHeaders.set('Content-Type', 'application/json');
  if (TMDB_ACCESS_TOKEN) {
    newHeaders.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN}`);
  }
  config.headers = newHeaders;
  return config;
});
