import { headers } from 'next/headers';
import { MOBILE_VIEW_REGEXP } from '#config/regexp';

export function isMobileView() {
  const userAgent = headers().get('user-agent');
  return !!userAgent?.match(MOBILE_VIEW_REGEXP);
}
