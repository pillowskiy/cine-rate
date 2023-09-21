import { cn } from '@libs/index';
import { BookmarkPlus } from 'lucide-react';
import { Button } from '@ui/button';
import { useContext, useState } from 'react';
import { StatesContext } from '.';

interface RatingButtonProps {
  alreadyInList: boolean;
}

export function WatchlistButton({ alreadyInList }: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const [inWatchlist, setInWatchlist] = useState(alreadyInList);

  return (
    <Button
      className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
      size='icon'
      variant='outline'
    >
      <BookmarkPlus
        className={cn('h-5 w-5', inWatchlist && 'fill-foreground')}
      />
    </Button>
  );
}
