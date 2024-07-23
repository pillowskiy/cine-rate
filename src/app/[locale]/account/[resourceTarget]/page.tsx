import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import zod from 'zod';
import type { AppPageParams } from '#types/index';
import { ResourceTarget } from '#config/enums';
import { ResourcesTabs } from '#components/resources/tabs';
import { TitledSection } from '#components/section/titled';

const paramsDto = zod.object({
  resourceTarget: zod.nativeEnum(ResourceTarget),
});

export default function ResourcesPage({ params }: AppPageParams) {
  unstable_setRequestLocale(params.locale);
  const parsedParams = paramsDto.safeParse(params);
  const t = useTranslations('Account.Resources');

  if (!parsedParams.success) {
    return notFound();
  }

  const { resourceTarget } = parsedParams.data;
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
