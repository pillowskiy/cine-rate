import type { CombinedCreditsResponse } from '@app/types/person-types';
import type { BaseParams } from '@app/types/index';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Separator } from '@ui/separator';
import { $api } from '@/app/_shared/api/api-interceptor';
import { MediaType } from '@config/enums';
import { NotFound } from '@/app/_components/not-found';

export function getCombinedCredits(personId: number, params?: BaseParams) {
  return $api.get<CombinedCreditsResponse>(
    `/3/${MediaType.Person}/${personId}/combined_credits`,
    {
      params,
    }
  );
}

interface CombinedCreditsProps {
  personId: number;
}

export default async function CombinedCredits({
  personId,
}: CombinedCreditsProps) {
  const { data: credits } = await getCombinedCredits(personId).catch(() => ({
    data: null,
  }));

  if (!credits) return null;

  return (
    <section>
      <div>
        <h2 className='text-lg font-medium leading-none'>Known for</h2>
        <Separator className='my-4' />
      </div>

      <Carousel>
        {!!credits.cast.length ? (
          credits.cast
            .sort((a, b) => b.vote_count - a.vote_count)
            .slice(0, 20)
            .map((credit) => (
              <CreationArticle
                aspect='horizontal'
                key={credit.id}
                creation={credit}
                className='w-[260px]'
                size='sm'
                width={260}
                height={140}
              />
            ))
        ) : (
          <NotFound />
        )}
      </Carousel>
    </section>
  );
}
