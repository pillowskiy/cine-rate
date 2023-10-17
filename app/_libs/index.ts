import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CapitalizeOptions {
  join?: string;
  assignLowerCase?: boolean;
  split?: string;
}
export function capitalize(
  string: string,
  options?: CapitalizeOptions
): string {
  return (options?.assignLowerCase ? string.toLocaleLowerCase() : string)
    .split(options?.split ?? ' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(options?.join ?? ' ');
}

type ObjectKeys = string | number | symbol;
type ValuesAsKeys<T extends object> = {
  [Key in keyof T]: T[Key] extends ObjectKeys ? T[Key] : never;
};

export function groupBy<T extends object, K extends keyof ValuesAsKeys<T>>(
  array: T[],
  key: K
) {
  const result = {} as Record<T[K] & ObjectKeys, T[]>;
  return array.reduce((prev, cur) => {
    const value = cur[key];
    if (typeof value === 'string') {
      if (!prev[value]) prev[value] = [];
      prev[value]!.push(cur);
    }
    return prev;
  }, result);
}