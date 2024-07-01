import zod from 'zod';

import { MediaType } from '@config/enums';

export const paramsDto = zod.object({
  mediaType: zod.nativeEnum(MediaType),
});
