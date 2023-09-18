import zod from 'zod';

// TEMP: error handling
export const pipe = {
  string: (value: unknown) => zod.string().parse(value),
  int: (value: unknown) => zod.number().int().parse(value),
  strToInt: (value: unknown) => zod.string().regex(/^\d+$/).transform(Number).parse(value),
} as const;