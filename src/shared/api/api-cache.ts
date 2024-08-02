export const hourCacheTerm = {
  cache: 'force-cache',
  next: {
    revalidate: 3600,
  },
} as const;

export const dayCacheTerm = {
  cache: 'force-cache',
  next: {
    revalidate: 3600 * 24,
  },
} as const;

export const weekCacheTerm = {
  cache: 'force-cache',
  next: {
    revalidate: 3600 * 24 * 7,
  },
} as const;

export const staticPersistentCacheTerm = {
  cache: 'force-cache',
  next: {},
} as const;

export function generateCache(
  term: 'hour' | 'day' | 'week' | 'static',
  overrideKeys: RequestInit['next'] = {}
): RequestInit {
  let validationTerm: RequestInit;
  switch (term) {
    case 'hour':
      validationTerm = hourCacheTerm;
      break;
    case 'day':
      validationTerm = dayCacheTerm;
      break;
    case 'week':
      validationTerm = weekCacheTerm;
      break;
    case 'static':
      validationTerm = staticPersistentCacheTerm;
      break;
  }

  return {
    ...validationTerm,
    next: {
      ...validationTerm.next,
      ...overrideKeys,
    },
  };
}
