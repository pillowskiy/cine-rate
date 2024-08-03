import { ICrew } from '#types/person-types';
import { PersonArticle } from '#components/article/person-article';
import { groupBy } from '#libs/index';

interface CreationCrewProps {
  crew: ICrew[];
}

export default function CreationCrew({ crew }: CreationCrewProps) {
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
                details={<p className='text-sm'>{credit.job}</p>}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
