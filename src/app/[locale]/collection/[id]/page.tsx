import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations('CollectionPage');

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CollectionHeader details={collection} />
      <TitledSection
        title={t('CollectionCreations.title')}
        subTitle={t('CollectionCreations.description', {
          collectionName: collection.name,
        })}
      >
        <CollectionCreations parts={collection.parts} />
      </TitledSection>

      <TitledStreamingSection
        title={t('CollectionMediaTabs.title')}
        subTitle={t('CollectionMediaTabs.description', {
          collectionName: collection.name,
        })}
        fallback={<LoadingCarousel withText={false} />}
      >
        <CollectionMediaTabs collectionId={collection.id} />
      </TitledStreamingSection>
    </main>
  );
}
