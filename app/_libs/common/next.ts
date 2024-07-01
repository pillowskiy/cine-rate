import { NextResponse } from 'next/server';

import { SafeParseError, ZodAny } from 'zod';
import zod from 'zod';

export const pipe = {
  string: (value: unknown) => zod.string().parse(value),
  int: (value: unknown) => zod.number().int().parse(value),
  strToInt: (value: unknown) =>
    zod.string().regex(/^\d+$/).transform(Number).parse(value),
} as const;

export function generateZodErrorsResponse(
  result: SafeParseError<zod.infer<ZodAny>>
) {
  if (result.error.issues.length) {
    return NextResponse.json(
      { errors: result.error.format()._errors },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: 'Unhandled zod error' }, { status: 500 });
}

// One month
export const SESSION_COOKIE_EXPIRES = () => Date.now() + 1000 * 3600 * 24 * 30;
