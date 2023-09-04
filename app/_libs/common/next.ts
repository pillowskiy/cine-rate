import { INextPageParams } from '@/app/_types';

export function intParamPipe(key: string, params: INextPageParams['params']): number {
  const seasonNumber = +(params?.[key].toString() || NaN);
  if (isNaN(seasonNumber)) {
    throw new Error(`Param ${key} must be an integer number!`);
  }
  return seasonNumber;
}
