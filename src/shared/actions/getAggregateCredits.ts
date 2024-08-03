import { BaseParams } from '#types/index';
import { IAggregateCredit } from '#types/tv-types';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getAggregateCredits(
  seriesId: number,
  params: BaseParams = {}
): Promise<IAggregateCredit> {
  return $api.fetch<IAggregateCredit>(`/tv/${seriesId}/aggregate_credits`, {
    params,
    ...dayCacheTerm,
  });
}
