import { ITVCredit } from '#types/tv-types';
import { PersonArticle } from '#components/article/person-article';

interface SeriesCastProps {
  cast: ITVCredit[];
}

export default function SeriesCast({ cast }: SeriesCastProps) {
  return (
    <div className='space-y-4'>
      {cast.map((credit) => (
        <PersonArticle
          aspect='horizontal'
          key={credit.id}
          person={credit}
          details={
            <div className='text-xs sm:text-sm'>
              {credit.roles.map((role) => (
                <p key={role.credit_id}>
                  {role.character}{' '}
                  <i className='text-foreground/70'>
                    ({role.episode_count} episodes)
                  </i>
                </p>
              ))}
            </div>
          }
        />
      ))}
    </div>
  );
}
