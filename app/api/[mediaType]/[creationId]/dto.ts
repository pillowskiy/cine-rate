import zod from 'zod';
import { MediaType } from '@config/enums';

export const paramsDto = zod.object({
  creationId: zod.string().regex(/^\d+$/).transform(Number),
  mediaType: zod.nativeEnum(MediaType),
});
