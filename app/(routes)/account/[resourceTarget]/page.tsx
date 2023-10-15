import { Heading } from '@/app/_components/heading';
import { MSeparator } from '@/app/_components/ui/separator';
import type { INextPageParams } from '@app/types/index';
import { ResourcesTabs } from '@components/resources/tabs';
import { ResourceTarget } from '@config/enums';
import { notFound } from 'next/navigation';
import zod from 'zod';

const paramsDto = zod.object({
  resourceTarget: zod.nativeEnum(ResourceTarget),
});

export default function ResourcesPage({ params }: INextPageParams) {
  const parsedParams = paramsDto.safeParse(params);

  if (!parsedParams.success) {
    return notFound();
  }

  const { resourceTarget } = parsedParams.data;
  return (
    <main className='min-h-screen'>
      <Heading
        title={`My ${resourceTarget}`}
        description='Creations that have been influenced by you'
      />
      <MSeparator className='my-4' />
      <ResourcesTabs target={resourceTarget} />
    </main>
  );
}
