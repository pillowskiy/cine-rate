import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import zod from 'zod';
import type { AppPageParams } from '#types/index';
import { ResourceTarget } from '#config/enums';
import { TitledSection } from '#components/section/titled';
import ResourcesTabs from './resources-tabs';

export default function ResourcesPage({ params }: AppPageParams) {
  unstable_setRequestLocale(params.locale);
  const parsedResourceTarget = zod
    .nativeEnum(ResourceTarget)
    .safeParse(params.resourceTarget);
  const t = useTranslations('Account.Resources');

  if (!parsedResourceTarget.success) {
    return notFound();
  }

  const resourceTarget = parsedResourceTarget.data;
  return (
    <TitledSection
      className='min-h-screen'
      title={t('title', {
        resources: t(`labels.${resourceTarget}`),
      })}
      subTitle={t('description')}
    >
      <ResourcesTabs target={resourceTarget} />
    </TitledSection>
  );
}
