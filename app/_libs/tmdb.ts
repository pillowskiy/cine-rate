export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const buildImagePath = (
  path: string,
  width: string | number = 'original'
) => {
  return TMDB_IMAGE_URL + width + path;
};
