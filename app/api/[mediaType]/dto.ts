import { MediaType } from '@config/enums';
import zod from 'zod';

export const paramsDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
});