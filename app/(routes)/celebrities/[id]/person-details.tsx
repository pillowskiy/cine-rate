import type { IPersonDetails } from '@app/types/person-types';

interface PersonDetailsProps {
  person: IPersonDetails;
}

const genders = ['Not Specified', 'Female', 'Male', 'Non Binary'] as const;

export default function PersonDetails({ person }: PersonDetailsProps) {
  const [birthDate, deathDate] = [
    new Date(person.birthday),
    new Date(person.deathday || Date.now()),
  ];

  return (
    <section>
      <h2 className='text-xl font-medium leading-none my-4'>Personal Details</h2>

      <div className='space-y-4'>
        <div>
          <span>Gender:</span>
          <p className='truncate text-sm opacity-70'>
            {genders[person.gender]}
          </p>
        </div>
        <div>
          <span>Birthday:</span>
          <p className='truncate text-sm opacity-70'>
            {birthDate.toLocaleDateString()}{' '}
            {person.deathday && `- ${deathDate.toLocaleDateString()}`}(
            {deathDate.getFullYear() - birthDate.getFullYear()} years)
          </p>
        </div>
        <div>
          <span>Place of birth:</span>
          <p className='truncate text-sm opacity-70'>{person.place_of_birth}</p>
        </div>
        <div>
          <span>Known for department:</span>
          <p className='truncate text-sm opacity-70'>{person.known_for_department}</p>
        </div>
      </div>
    </section>
  );
}
