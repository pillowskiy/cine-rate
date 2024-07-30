import { Filter } from 'lucide-react';
import { MediaType, MovieSort, TVSort } from '#config/enums';
import { Button } from '#ui/button';
import CreationFilterDialog from './creation-filter-dialog';
import CreationSortSelect from './creation-sort-select';

interface CreationCatalogHeaderProps {
  mediaType: MediaType;
}

const sortMethodMappings = {
  [MediaType.TV]: TVSort,
  [MediaType.Movie]: MovieSort,
} as const;

function getSortMethod(mediaType: MediaType) {
  if (mediaType === MediaType.Person) {
    throw new Error("CreationCatalogHeader doesn't support Person MediaType");
  }
  return sortMethodMappings[mediaType];
}

export function CreationCatalogHeader({
  mediaType,
}: CreationCatalogHeaderProps) {
  const Sort = getSortMethod(mediaType);

  return (
    <header className='flex gap-2 overflow-hidden py-2'>
      <CreationFilterDialog mediaType={mediaType}>
        <Button size='icon' variant='outline' aria-label='Catalog Filter'>
          <Filter className='size-5' />
        </Button>
      </CreationFilterDialog>

      <CreationSortSelect Sort={Sort} />
    </header>
  );
}
