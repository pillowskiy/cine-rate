import { Separator } from '@ui/separator';
import type { IPersonDetails } from '@app/types/person-types';

interface PersonKnownAsProps {
  person: IPersonDetails;
}

export default function PersonKnownAs({ person }: PersonKnownAsProps) {
  return (
    <section>
      <div>
        <h2 className='text-lg leading-none'>Also known as</h2>
        <Separator className='my-4' />
      </div>

      <div className='flex flex-wrap gap-1.5 text-xs sm:text-sm'>
        {person.also_known_as.map((known) => (
          <div key={known} className='opacty-70 rounded-md border p-1'>
            {known}
          </div>
        ))}
      </div>
    </section>
  );
}
