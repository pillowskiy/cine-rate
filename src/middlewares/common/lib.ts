import { type NextMiddleware, NextResponse } from 'next/server';
import type { AppMiddleware, AppMiddlewareFactory } from './types';

export function createGuardedMiddlewares(
  factories: AppMiddlewareFactory[]
): AppMiddleware[] {
  return factories.map(
    (factory): AppMiddleware =>
      (req, next, ...args) => {
        if (!factory.matcher || factory.matcher.test(req.nextUrl.pathname)) {
          return factory.handler(req, next, ...args);
        }
        return next();
      }
  );
}

export function stackMiddlewares(
  ...factories: AppMiddlewareFactory[]
): NextMiddleware {
  const middlewares = createGuardedMiddlewares(factories);

  function createChainedMiddleware(): NextMiddleware {
    const current = middlewares.pop();
    if (!current) return () => NextResponse.next();
    const next = createChainedMiddleware();
    return (req, event) => current(req, () => next(req, event), event);
  }

  return createChainedMiddleware();
}
