import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { INextPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { MediaType } from '#config/enums';
import CreationCollection from '#components/creation/creation-collection';
import CreationPartialCast from '#components/creation/creation-credits/creation-partial-cast';
import CreationHeader from '#components/creation/creation-header';
import CreationMediaTabs from '#components/creation/creation-media-tabs';
import CreationOverview from '#components/creation/creation-overview';
import CreationSimilar from '#components/creation/creation-similar';
import { TitledStreamingSection } from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { generateCreationMetadata } from '#libs/common/metadata';
import { getCreationTitle } from '#libs/tmdb';
import { pipeSlugId } from '#libs/tmdb/slugify';
import MovieDetails from './movie-details';

const CreationReviews = dynamic(
  () => import('#components/creation/creation-reviews')
);

export const generateMetadata = generateCreationMetadata(MediaType.Movie);

export default async function MoviePage(props: INextPageParams) {
  const params = await props.params;
  const t = await getTranslations('Creations');
  const movieId = pipeSlugId(params.slug);
  const [movie, error] = await getCreationDetails(movieId, MediaType.Movie);

  if (error) return notFound();

  return (
    <main className='grid min-h-screen w-full grid-cols-1 gap-6 md:grid-cols-[1fr_260px]'>
      <CreationHeader details={movie} mediaType={MediaType.Movie} />
      <div className='grow space-y-6 overflow-hidden'>
        <CreationOverview details={movie} />
        <TitledStreamingSection
          title={t('CreationCast.title')}
          subTitle={t('CreationCast.description', {
            title: getCreationTitle(movie),
          })}
          fallback={<LoadingCarousel />}
        >
          <CreationPartialCast
            creationId={movie.id}
            mediaType={MediaType.Movie}
          />
        </TitledStreamingSection>
        {movie.belongs_to_collection && (
          <TitledStreamingSection
            title={t('CreationCollection.title')}
            subTitle={t('CreationCollection.description')}
            fallback={<LoadingCarousel aspect='horizontal' withText={false} />}
          >
            <CreationCollection collectionId={movie.belongs_to_collection.id} />
          </TitledStreamingSection>
        )}
        <TitledStreamingSection
          title={t('CreationMediaTabs.title')}
          subTitle={t('CreationMediaTabs.description')}
          fallback={<LoadingCarousel withText={false} />}
        >
          <CreationMediaTabs
            mediaType={MediaType.Movie}
            creationId={movie.id}
          />
        </TitledStreamingSection>

        <TitledStreamingSection
          title={t('CreationSimilar.title')}
          subTitle={t('CreationSimilar.description', {
            title: getCreationTitle(movie),
          })}
          fallback={<LoadingCarousel aspect='horizontal' />}
        >
          <CreationSimilar creationId={movie.id} mediaType={MediaType.Movie} />
        </TitledStreamingSection>

        <CreationReviews creationId={movie.id} mediaType={MediaType.Movie} />
      </div>
      <MovieDetails
        className='w-full min-w-[260px] space-y-6 sm:w-[260px]'
        details={movie}
      />
    </main>
  );
}
