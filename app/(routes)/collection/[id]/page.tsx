import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { LoadingCarousel } from '@/app/_components/skeleton/loading-carousel';
import type { INextPageParams } from '@app/types/index';
import { getCollection } from '@actions/getCollection';
import { pipe } from '@libs/common/next';
import CollectionHeader from './collection-header';

const CollectionCreations = dynamic(() => import('./collection-creations'), {
  ssr: false,
  loading: () => <LoadingCarousel aspect='horizontal' />,
});
const CollectionMediaTabs = dynamic(() => import('./collection-media-tabs'), {
  ssr: false,
  loading: () => <LoadingCarousel className='mt-6' />,
});

export default async function CollectionPage({ params }: INextPageParams) {
  const collectionId = pipe.strToInt(params?.id);
  const [collection, error] = await getCollection(collectionId);

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CollectionHeader details={collection} />
      <CollectionCreations parts={collection.parts} />
      <CollectionMediaTabs collectionId={collection.id} />
    </main>
  );
}
