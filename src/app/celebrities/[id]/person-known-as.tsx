import type { IPersonDetails } from '#types/person-types';

interface PersonKnownAsProps {
  person: IPersonDetails;
}

export default function PersonKnownAs({ person }: PersonKnownAsProps) {
  if (!person.also_known_as.length) return null;

  return (
    <div className='flex flex-wrap gap-1.5 text-xs sm:text-sm'>
      {person.also_known_as.map((known) => (
        <div key={known} className='opacty-70 rounded-md border p-1'>
          {known}
        </div>
      ))}
    </div>
  );
}
