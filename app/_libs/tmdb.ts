export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface TMDBImagePathProps {
  path: string | null;
  scale?: keyof typeof scales
}

const scales = {
  poster: `w260_and_h390_face`,
  backdrop: `w500_and_h282_face`,
} as const;

export function buildImagePath({ path, scale }: TMDBImagePathProps) {
  if (!path) return '';
  return TMDB_IMAGE_URL + (scale ? scales[scale] : 'original') + path;
}
