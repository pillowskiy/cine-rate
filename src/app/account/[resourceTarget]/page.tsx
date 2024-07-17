import { notFound } from 'next/navigation';
import zod from 'zod';
import type { INextPageParams } from '#types/index';
import { ResourceTarget } from '#config/enums';
import { ResourcesTabs } from '#components/resources/tabs';
import { TitledSection } from '#components/section/titled';

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
    <TitledSection
      className='min-h-screen'
      title={`Your ${resourceTargetsLabel[resourceTarget]}`}
      subTitle='Creations that was influenced by you.'
    >
      <ResourcesTabs target={resourceTarget} />
    </TitledSection>
  );
}
