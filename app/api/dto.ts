import zod from 'zod';

export const paginationDto = zod.object({
    page: zod.string().regex(/^\d+$/).transform(Number),
});

export type Pagination = zod.infer<typeof paginationDto>;