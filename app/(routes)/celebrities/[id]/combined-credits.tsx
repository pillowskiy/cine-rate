import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { getCombinedCredits } from '@actions/getCombinedCredits';
import { Separator } from '@ui/separator';

interface CombinedCreditsProps {
  personId: number;
}

export default async function CombinedCredits({
  personId,
}: CombinedCreditsProps) {
  const { data: credits } = await getCombinedCredits(personId);

  if (!credits) return null;

  return (
    <section>
      <div>
        <h2 className='text-lg leading-none font-medium'>Known for</h2>
        <Separator className='my-4' />
      </div>

      <Carousel>
        {credits.cast
          .sort(
            (a, b) => b.popularity - a.popularity
          )
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
          ))}
      </Carousel>
    </section>
  );
}
