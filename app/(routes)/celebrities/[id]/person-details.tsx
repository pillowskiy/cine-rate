import { List, ListItem } from '@/app/_components/ui/list';
import type { IPersonDetails } from '@app/types/person-types';

interface PersonDetailsProps {
  person: IPersonDetails;
}

const genders = ['Not Specified', 'Female', 'Male', 'Non Binary'] as const;

function getDetailedAge(person: IPersonDetails) {
  const birthDate = new Date(person.birthday);
  const birthDateString = birthDate.toLocaleDateString();

  const deathDate = new Date(person.deathday || Date.now());
  const deathDateString = person.deathday
    ? `- ${deathDate.toLocaleDateString()}`
    : '';

  const detailedInfo = [
    birthDateString,
    deathDateString,
    `(${deathDate.getFullYear() - birthDate.getFullYear()} years)`,
  ];

  return detailedInfo.join(' ');
}

export default function PersonDetails({ person }: PersonDetailsProps) {
  return (
    <section>
      <h2 className='my-4 text-xl font-medium leading-none'>
        Personal Details
      </h2>

      <List>
        <ListItem title='Gender:' description={genders[person.gender]} />
        <ListItem title='Birthday:' description={getDetailedAge(person)} />
        <ListItem title='Place of birth:' description={person.place_of_birth} />
        <ListItem
          title='Known for department:'
          description={person.known_for_department}
        />
      </List>
    </section>
  );
}
