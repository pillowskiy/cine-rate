const YOUTUBE_URL = 'https://www.youtube.com/';

export function buildURL(key: string) {
  return YOUTUBE_URL + `watch?v=${key}`;
}
