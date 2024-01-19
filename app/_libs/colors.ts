import 'server-only';
import getColors from 'get-image-colors';

const DEFAULT_COLOR = '#ffffff';

// The function works very slowly and blocks sending RSC for an average of 1.5 seconds 🤯
export async function getAverageColorFromUrl(url?: string | null) {
  if (!url) return DEFAULT_COLOR;

  const color = await getColors(url).then(
    (res) => res.at(0)?.hex(),
    () => null
  );
  return color ?? DEFAULT_COLOR;
}
