import { useTranslations } from 'next-intl';
import type { IPersonDetails } from '#types/person-types';
import { List, ListItem } from '#ui/list';

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

  const detailedInfo = [birthDateString, deathDateString];

  return {
    birthDateString: detailedInfo.join(' '),
    age: deathDate.getFullYear() - birthDate.getFullYear(),
  };
}

export default function PersonDetails({ person }: PersonDetailsProps) {
  const t = useTranslations('PersonPage.PersonDetails');
  const { age, birthDateString } = getDetailedAge(person);

  return (
    <section className='space-y-4'>
      <h1 className='truncate text-2xl font-medium'>{person.name}</h1>

      <List>
        <ListItem title={t('gender')} description={genders[person.gender]} />
        <ListItem
          title={t('birthday')}
          description={`${birthDateString} (${age} ${t('yearsOld')})`}
        />
        <ListItem
          title={t('placeOfBirth')}
          description={person.place_of_birth}
        />
        <ListItem
          title={t('knownForDepartment')}
          description={person.known_for_department}
        />
      </List>
    </section>
  );
}
