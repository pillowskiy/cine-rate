import 'server-only';
import getColors from 'get-image-colors';

const DEFAULT_COLOR = '#ffffff';

export async function getAverageColorFromUrl(url?: string | null) {
  if (!url) return DEFAULT_COLOR;

  const color = await getColors(url).then(
    (res) => res.at(0)?.hex(),
    () => null
  );
  return color ?? DEFAULT_COLOR;
}
