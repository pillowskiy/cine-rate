import { MediaType } from '@config/enums';
import zod from 'zod';

export const paramsDto = zod.object({
    creationId: zod.string().regex(/^\d+$/).transform(Number),
    mediaType: zod.nativeEnum(MediaType),
})