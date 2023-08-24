import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CapitalizeOptions {
  join?: string;
  assignLowerCase?: boolean;
}
export function capitalize(
  string: string,
  options?: CapitalizeOptions
): string {
  return (options?.assignLowerCase ? string.toLocaleLowerCase() : string)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(options?.join || ' ');
}
