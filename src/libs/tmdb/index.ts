import type { CreationVideosResponse } from '#types/creation-types';

export * from './images';
export * from './externals-links';
export * from './ribbon';

export function inferOfficialTrailer({ results }: CreationVideosResponse) {
  const officialTrailer = results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  return results.length ? officialTrailer || results[0] : null;
}
