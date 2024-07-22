import { notFound } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { getCollection } from '#actions/getCollection';
import {
  TitledSection,
  TitledStreamingSection,
} from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { pipe } from '#libs/common/next';
import CollectionCreations from './collection-creations';
import CollectionHeader from './collection-header';
import CollectionMediaTabs from './collection-media-tabs';

export default async function CollectionPage({ params }: INextPageParams) {
  const collectionId = pipe.strToInt(params?.id);
  const [collection, error] = await getCollection(collectionId);

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CollectionHeader details={collection} />
      <TitledSection
        title='Creations'
        subTitle={`Creations that belongs to the ${collection.name}`}
      >
        <CollectionCreations parts={collection.parts} />
      </TitledSection>

      <TitledStreamingSection
        title='Media'
        subTitle='The media associated with this collection.'
        fallback={<LoadingCarousel withText={false} />}
      >
        <CollectionMediaTabs collectionId={collection.id} />
      </TitledStreamingSection>
    </main>
  );
}
