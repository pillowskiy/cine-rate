import { Tabs, TabsList, TabsTrigger } from '@ui/tabs';
import { ResourceType } from '@config/enums';
import WatchlistTabsContent from './watchlist-tabs-content';

export default function WatchlistPage() {
  return (
    <main className='main-h-screen'>
      <Tabs defaultValue={ResourceType.Movie}>
        <TabsList>
          <TabsTrigger value={ResourceType.Movie}>Movies</TabsTrigger>
          <TabsTrigger value={ResourceType.TV}>Series</TabsTrigger>
        </TabsList>
        <WatchlistTabsContent resourceType={ResourceType.Movie} />
        <WatchlistTabsContent resourceType={ResourceType.TV} />
      </Tabs>
    </main>
  );
}
