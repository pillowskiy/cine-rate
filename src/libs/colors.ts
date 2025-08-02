import Vibrant from 'node-vibrant';
import 'server-only';

const DEFAULT_COLOR = '#ffffff';

export async function getAverageColorFromUrl(url?: string | null) {
  if (!url) return DEFAULT_COLOR;

  const palette = await Vibrant.from(url).getPalette();
  return palette.Vibrant?.hex ?? DEFAULT_COLOR;
}