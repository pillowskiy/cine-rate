import { MOBILE_VIEW_REGEXP } from "@config/regexp";
import { headers } from "next/headers";

export function isMobileView() {
    const userAgent = headers().get('user-agent');
    return !!userAgent?.match(MOBILE_VIEW_REGEXP);
}