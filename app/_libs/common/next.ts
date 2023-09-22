import { NextResponse } from 'next/server';
import zod from 'zod';

// TEMP: error handling
export const pipe = {
  string: (value: unknown) => zod.string().parse(value),
  int: (value: unknown) => zod.number().int().parse(value),
  strToInt: (value: unknown) => zod.string().regex(/^\d+$/).transform(Number).parse(value),
} as const;

import { SafeParseError, ZodAny } from "zod";

export function generateZodErrorsResponse(result: SafeParseError<zod.infer<ZodAny>>) {
  if (result.error.issues.length) {
    return NextResponse.json(
      { errors: result.error.format() },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: 'Unhandled zod error' },
    { status: 500 }
  );
}