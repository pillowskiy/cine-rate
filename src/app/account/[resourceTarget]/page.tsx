import { notFound } from 'next/navigation';
import zod from 'zod';
import type { INextPageParams } from '#types/index';
import { ResourceTarget } from '#config/enums';
import { MSeparator } from '#ui/separator';
import { Heading } from '#components/heading';
import { ResourcesTabs } from '#components/resources/tabs';

const paramsDto = zod.object({
  resourceTarget: zod.nativeEnum(ResourceTarget),
});

const resourceTargetsLabel = {
  [ResourceTarget.Favorite]: 'Favorites',
  [ResourceTarget.Rated]: 'Rated',
  [ResourceTarget.Watchlist]: 'Watchlist',
} satisfies Record<ResourceTarget, string>;

export default function ResourcesPage({ params }: INextPageParams) {
  const parsedParams = paramsDto.safeParse(params);

  if (!parsedParams.success) {
    return notFound();
  }

  const { resourceTarget } = parsedParams.data;
  return (
    <main className='min-h-screen'>
      <Heading
        title={`My ${resourceTargetsLabel[resourceTarget]}`}
        description='Creations that have been influenced by you'
      />
      <MSeparator className='my-4' />
      <ResourcesTabs target={resourceTarget} />
    </main>
  );
}
