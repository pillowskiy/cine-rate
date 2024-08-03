import { ICredit } from '#types/person-types';
import { PersonArticle } from '#components/article/person-article';

interface CreationCastProps {
  cast: ICredit[];
}

export default function CreationCast({ cast }: CreationCastProps) {
  return (
    <div className='space-y-4'>
      {cast.map((credit) => (
        <PersonArticle
          key={credit.id}
          aspect='horizontal'
          person={credit}
          details={<p className='text-sm'>{credit.character}</p>}
        />
      ))}
    </div>
  );
}
