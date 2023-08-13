import { CreationCard } from '@components/creations/creation-card';
import { Separator } from '@ui/separator';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { getTrending } from '@actions/getTrending';
import { getCelebrities } from '@actions/getCelebrities';
import { CelebrityCard } from '@components/celebrity-card';

export default async function Home() {
  const { data: creations } = await getTrending({});
  const { data: celebrities } = await getCelebrities({});
  if (!creations || !celebrities) return null;

  return (
    <div className='h-screen w-full'>
      <div className='mt-6 flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Trands now</h2>
          <p className='text-sm text-muted-foreground'>
            This week&apos;s top TV and movies.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <ScrollArea>
        <section className='flex snap-x space-x-4 pb-4'>
          {creations.results.map((creation) => (
            <CreationCard
              key={creation.id}
              creation={creation}
              className='w-[260px]'
              width={480}
              height={854}
            />
          ))}
        </section>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      <div className='mt-6 flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Popular</h2>
          <p className='text-sm text-muted-foreground'>
            The most viewed TV and movies.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <ScrollArea>
        <section className='flex snap-x space-x-4 pb-4'>
          {creations.results.map((creation) => (
            <CreationCard
              key={creation.id}
              creation={creation}
              className='w-[260px]'
              size='sm'
              width={720}
              height={480}
            />
          ))}
        </section>
        <ScrollBar className='' orientation='horizontal' />
      </ScrollArea>

      <div className='mt-6 flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Celebrities</h2>
          <p className='text-sm text-muted-foreground'>
            The most popular celebrities.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <ScrollArea>
        <section className='flex snap-x space-x-4 pb-4'>
          {celebrities.results.map((celebrity) => (
            <CelebrityCard
              key={celebrity.id}
              celebrity={celebrity}
              className='w-[260px]'
            />
          ))}
        </section>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
