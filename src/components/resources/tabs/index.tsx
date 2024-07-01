import { ResourceTarget, ResourceType } from '#config/enums';
import { Tabs, TabsList, TabsTrigger } from '#ui/tabs';
import ResourcesTabsContent from './resources-tabs-content';

interface ResourcesTabsProps {
  target: ResourceTarget;
}

export function ResourcesTabs({ target }: ResourcesTabsProps) {
  return (
    <Tabs defaultValue={ResourceType.Movie}>
      <TabsList>
        <TabsTrigger value={ResourceType.Movie}>Movies</TabsTrigger>
        <TabsTrigger value={ResourceType.TV}>Series</TabsTrigger>
      </TabsList>
      <ResourcesTabsContent target={target} resourceType={ResourceType.Movie} />
      <ResourcesTabsContent target={target} resourceType={ResourceType.TV} />
    </Tabs>
  );
}
