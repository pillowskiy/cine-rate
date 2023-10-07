import { createFetchInterceptor } from '@libs/common/fetch';
const { TMDB_API_URL, TMDB_ACCESS_TOKEN } = process.env;

export const $api = createFetchInterceptor(TMDB_API_URL, {
  credentials: 'include',
  mode: 'cors',
  next: { revalidate: 1200 }
});

$api.request.use((config) => {
  const newHeaders = new Headers(config.headers);
  newHeaders.set('Accept', 'application/json');
  newHeaders.set('Content-Type', 'application/json');
  if (TMDB_ACCESS_TOKEN) {
    newHeaders.set('Authorization', `Bearer ${TMDB_ACCESS_TOKEN}`);
  }
  config.headers = newHeaders;
  return config;
});
