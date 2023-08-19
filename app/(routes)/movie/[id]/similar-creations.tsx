import { CreationArticle } from '@components/article/creation-article';
import { getSimilar } from '@actions/getSimilar';
import { Carousel } from '@/app/_components/carousel';

interface SimilarCreationsProps {
  movieId: number;
}

export async function SimilarCreations({ movieId }: SimilarCreationsProps) {
  const { data: creations } = await getSimilar(movieId);

  if (!creations) return null;

  return (
    <Carousel>
      {creations.results.map((creation) => (
        <CreationArticle
          aspect='horizontal'
          key={creation.id}
          creation={creation}
          className='w-[260px]'
          size='sm'
          width={720}
          height={480}
        />
      ))}
    </Carousel>
  );
}
