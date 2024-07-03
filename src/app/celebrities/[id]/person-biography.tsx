import { getPersonTranslations } from '#actions/getPersonTranslations';
import { NotFound } from '#components/not-found';

interface PersonBiographyProps {
  personId: number;
}

const MAX_FRAGMENTS = 2;

export default async function PersonBiography({
  personId,
}: PersonBiographyProps) {
  const [data, error] = await getPersonTranslations(personId);
  if (error || !data?.translations.length) return null;

  const [translation] = data.translations;
  const fragmentedBio = translation.data.biography.split('\n').filter(Boolean);

  if (!fragmentedBio.length) {
    return <NotFound />;
  }

  return (
    <article className='relative space-y-4'>
      {fragmentedBio.slice(0, MAX_FRAGMENTS).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {fragmentedBio.length > MAX_FRAGMENTS && (
        <details className='space-y-4 pb-6'>
          <summary className='absolute bottom-0 right-0 cursor-pointer rounded-md p-2 no-underline marker:hidden marker:content-none [&[data-state=open]>svg]:rotate-180'>
            <span className='text-foreground/70 flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline'>
              Read more
            </span>
          </summary>
          {fragmentedBio.slice(MAX_FRAGMENTS).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </details>
      )}
    </article>
  );
}
