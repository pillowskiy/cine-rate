import type { CombinedCreditsResponse } from '#types/person-types';
import { MediaType } from '#config/enums';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import { $api } from '#api/api-interceptor';

export function getCombinedCredits(personId: number) {
  return $api.safeFetch<CombinedCreditsResponse>(
    `/${MediaType.Person}/${personId}/combined_credits`
  );
}

interface CombinedCreditsProps {
  personId: number;
}

export default async function CombinedCredits({
  personId,
}: CombinedCreditsProps) {
  const [credits, error] = await getCombinedCredits(personId);

  if (error) return null;

  if (!credits.cast.length) {
    return <NotFound />;
  }

  return (
    <Carousel>
      {credits.cast
        .sort((a, b) => b.vote_count - a.vote_count)
        .slice(0, 20)
        .map((credit, i) => (
          <CreationArticle
            custom={i}
            aspect='horizontal'
            key={credit.id}
            creation={credit}
            className='w-[260px]'
            width={260}
            height={140}
          />
        ))}
    </Carousel>
  );
}
