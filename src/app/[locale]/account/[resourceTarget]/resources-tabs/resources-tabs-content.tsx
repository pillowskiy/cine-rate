'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ky from 'ky';
import type { CreationsResponse } from '#types/creation-types';
import type { IPagination } from '#types/index';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import { MediaType, ResourceTarget, ResourceType } from '#config/enums';
import { initialPagination } from '#config/pagination';
import { TabsContent } from '#ui/tabs';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { ResourceTabsItems } from './resources-tabs-items';

type Items = CreationsResponse['results'] | null;

interface ResourcesTabsContentProps {
  resourceType: ResourceType;
  target: ResourceTarget;
}

const mediaTypes = {
  [ResourceType.Movie]: MediaType.Movie,
  [ResourceType.TV]: MediaType.TV,
} as const;

export default function ResourcesTabsContent({
  resourceType,
  target,
}: ResourcesTabsContentProps) {
  const [items, setItems] = useState<Items>(null);
  const [{ currentPage, totalPages }, setPagination] =
    useState<IPagination>(initialPagination);

  const searchParamsMap = useSearchParams();
  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParamsMap.entries()),
    [searchParamsMap]
  );

  const fetch = async (page: number = currentPage) => {
    const searchParams = { page, ...searchParamsObj };
    ky.get(`/api/account/${resourceType}/${target}`, {
      searchParams,
    })
      .then((res) => res.json<CreationsResponse>())
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void fetch(), []);

  const stopped: boolean = Boolean(currentPage && currentPage >= totalPages);
  const { canScroll } = useInfiniteScroll(fetch, currentPage, stopped);

  return (
    <TabsContent className='flex flex-wrap gap-4' value={resourceType}>
      <ResourceTabsItems mediaType={mediaTypes[resourceType]} items={items} />
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </TabsContent>
  );
}
