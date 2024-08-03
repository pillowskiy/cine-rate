import { getCreationCredits } from '#actions/getCreationCredits';
import { PersonArticle } from '#components/article/person-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import { SeeMoreResources } from '#components/see-more-resources';
import type { CreationIdentifierProps } from '../common/types';

/**
 * @deprecated We fetch and serialize huge amount of data
 * TMDB doesn't provide any other way to get creation cast list (with limited count of results)
 */
export default async function CreationPartialCast({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const credits = await getCreationCredits(creationId, mediaType).catch(
    () => null
  );

  if (!credits?.cast?.length) {
    return <NotFound />;
  }

  return (
    <Carousel>
      {credits.cast.slice(0, 20).map((credit, i) => (
        <PersonArticle
          custom={i}
          key={credit.id}
          person={credit}
          details={<p className='text-sm'>{credit.character}</p>}
        />
      ))}
      <SeeMoreResources
        href={`/${mediaType}/${creationId}/cast`}
        icon={'🎭'}
        colorSchema='blue'
      />
    </Carousel>
  );
}
