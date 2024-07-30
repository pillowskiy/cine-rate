import { useTranslations } from 'next-intl';
import { ResourceTarget, ResourceType } from '#config/enums';
import { Tabs, TabsList, TabsTrigger } from '#ui/tabs';
import ResourcesTabsContent from './resources-tabs-content';

interface ResourcesTabsProps {
  target: ResourceTarget;
}

export default function ResourcesTabs({ target }: ResourcesTabsProps) {
  const t = useTranslations('mediaTypes');

  return (
    <Tabs defaultValue={ResourceType.Movie}>
      <TabsList>
        <TabsTrigger value={ResourceType.Movie}>{t('movie')}</TabsTrigger>
        <TabsTrigger value={ResourceType.TV}>{t('tv')}</TabsTrigger>
      </TabsList>
      <ResourcesTabsContent target={target} resourceType={ResourceType.Movie} />
      <ResourcesTabsContent target={target} resourceType={ResourceType.TV} />
    </Tabs>
  );
}
