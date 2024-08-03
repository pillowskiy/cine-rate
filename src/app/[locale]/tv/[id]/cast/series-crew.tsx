import { ITVCrew } from '#types/tv-types';
import { PersonArticle } from '#components/article/person-article';
import { groupBy } from '#libs/index';

interface SeriesCrewProps {
  crew: ITVCrew[];
}

export default function SeriesCrew({ crew }: SeriesCrewProps) {
  const groupedCredits = groupBy(crew, 'department');

  return (
    <div className='space-y-8'>
      {Object.entries(groupedCredits).map(([department, credits]) => (
        <div className='space-y-2' key={department}>
          <h3 className='font-bold'>{department}</h3>
          <div className='space-y-4'>
            {credits.map((credit) => (
              <PersonArticle
                aspect='horizontal'
                key={credit.id}
                person={credit}
                details={
                  <div className='text-xs sm:text-sm'>
                    {credit.jobs.map((role) => (
                      <p key={role.credit_id}>
                        {role.job}{' '}
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
        </div>
      ))}
    </div>
  );
}
