import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextRequest } from 'next/server';

export type AppMiddleware = (
  request: NextRequest,
  next: () => NextMiddlewareResult | Promise<NextMiddlewareResult>,
  event: NextFetchEvent
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export interface AppMiddlewareFactory {
  handler: AppMiddleware;
  matcher?: RegExp;
}
