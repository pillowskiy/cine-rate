import type { ToggleResponse } from '@app/types/creation-types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { BookmarkPlus } from 'lucide-react';
import { cn } from '@libs/index';
import axios from 'axios';

interface RatingButtonProps {
  alreadyInList: boolean;
}

export function WatchlistButton({ alreadyInList }: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const [inWatchlist, setInWatchlist] = useState(alreadyInList);

  async function toggleWatchlist() {
    return (
      axios
        .post<ToggleResponse>('/api/states/watchlist', {
          mediaType,
          creationId,
          watchlist: !inWatchlist,
        })
        .then(() => setInWatchlist(!inWatchlist))
        // TEMP
        .catch(() => {})
    );
  }

  return (
    <Button
      className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
      size='icon'
      onClick={toggleWatchlist}
      variant='outline'
    >
      <BookmarkPlus
        className={cn('h-5 w-5', inWatchlist && 'fill-foreground')}
      />
    </Button>
  );
}
