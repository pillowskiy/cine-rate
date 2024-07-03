import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { getCreationDetails } from '#actions/getCreationDetails';
import { MediaType } from '#config/enums';
import CreationCast from '#components/creation/creation-cast';
import CreationCollection from '#components/creation/creation-collection';
import CreationHeader from '#components/creation/creation-header';
import CreationMediaTabs from '#components/creation/creation-media-tabs';
import CreationOverview from '#components/creation/creation-overview';
import CreationSimilar from '#components/creation/creation-similar';
import { TitledStreamingSection } from '#components/section/titled';
import { LoadingCarousel } from '#components/skeleton/loading-carousel';
import { generateCreationMetadata } from '#libs/common/metadata';
import { pipe } from '#libs/common/next';
import MovieDetails from './movie-details';

const CreationReviews = dynamic(
  () => import('#components/creation/creation-reviews'),
  { ssr: false }
);

export const generateMetadata = generateCreationMetadata(MediaType.Movie);

export default async function MoviePage({ params }: INextPageParams) {
  const paramId = pipe.strToInt(params?.id);
  const [movie, error] = await getCreationDetails(paramId, MediaType.Movie);

  if (error) return notFound();

  return (
    <main className='grid min-h-screen w-full grid-cols-1 gap-6 md:grid-cols-[1fr,260px]'>
      <CreationHeader details={movie} mediaType={MediaType.Movie} />
      <div className='grow space-y-6 overflow-hidden'>
        <CreationOverview details={movie} />
        <TitledStreamingSection
          title='Cast'
          subTitle={`The ${movie.title ?? movie.original_title} cast.`}
          fallback={<LoadingCarousel />}
        >
          <CreationCast creationId={movie.id} mediaType={MediaType.Movie} />
        </TitledStreamingSection>
        {movie.belongs_to_collection && (
          <TitledStreamingSection
            title='Collection'
            subTitle={`The Ultimate Showcase of Unintentional Accumulation!`}
            fallback={<LoadingCarousel aspect='horizontal' withText={false} />}
          >
            <CreationCollection collectionId={movie.belongs_to_collection.id} />
          </TitledStreamingSection>
        )}
        <TitledStreamingSection
          title='Media'
          subTitle='The media associated with this movie.'
          fallback={<LoadingCarousel withText={false} />}
        >
          <CreationMediaTabs
            mediaType={MediaType.Movie}
            creationId={movie.id}
          />
        </TitledStreamingSection>

        <TitledStreamingSection
          title='Similar'
          subTitle={`More like ${movie.title ?? movie.original_title}.`}
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
