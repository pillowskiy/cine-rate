import { type NextMiddleware, NextResponse } from 'next/server';
import type { AppMiddleware, AppMiddlewareFactory } from './types';

export function makeMiddlewares(
  factories: AppMiddlewareFactory[]
): AppMiddleware[] {
  return factories.map(
    (factory): AppMiddleware =>
      (req, next, ...args) => {
        if (!factory.matcher || factory.matcher.test(req.nextUrl.pathname)) {
          console.log(factory.matcher + ' has been called for' + req.url);
          return factory.handler(req, next, ...args);
        }
        return next();
      }
  );
}

export function stackMiddlewares(
  ...factories: AppMiddlewareFactory[]
): NextMiddleware {
  const middlewares = makeMiddlewares(factories);

  function makeNextMiddleware(): NextMiddleware {
    const current = middlewares.pop();
    if (!current) return () => NextResponse.next();
    const next = makeNextMiddleware();
    return (req, event) => current(req, () => next(req, event), event);
  }

  return makeNextMiddleware();
}
