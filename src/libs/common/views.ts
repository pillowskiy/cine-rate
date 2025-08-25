import { headers } from 'next/headers';
import { MOBILE_VIEW_REGEXP } from '#config/regexp';

export async function isMobileView() {
  const userAgent = (await headers()).get('user-agent');
  return !!userAgent?.match(MOBILE_VIEW_REGEXP);
}
