import { MediaType } from '@app/types/index';
import { CreationArticle } from '@components/article/creation-article';
import { Separator } from '@ui/separator';
import { Carousel } from '@components/carousel';
import { getPopular } from '@actions/getPopular';

interface CreationCarouselProps {
  mediaType: MediaType.Movie | MediaType.TV;
}

const mediaTextes = {
  [MediaType.Movie]: {
    heading: 'Movies that Conquer the World',
    description:
      'The most popular blockbusters and unforgettable masterpieces.',
  },
  [MediaType.TV]: {
    heading: 'Captivating Series',
    description: 'The most popular and widely known TV series.',
  },
};

export default async function CreationCarousel({
  mediaType,
}: CreationCarouselProps) {
  const { data: creations } = await getPopular(mediaType).catch(() => ({
    data: null,
  }));
  if (!creations) return null;

  const { heading, description } = mediaTextes[mediaType];

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>{heading}</h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
      <Separator className='my-4' />
      <Carousel>
        {creations.results.map((creation) => (
          <CreationArticle
            aspect='horizontal'
            key={creation.id}
            creation={creation}
            className='w-[260px]'
            size='sm'
            width={260}
            height={140}
          />
        ))}
      </Carousel>
    </section>
  );
}
