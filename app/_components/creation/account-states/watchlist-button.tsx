import type { ToggleResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { BookmarkPlus } from 'lucide-react';
import { cn } from '@libs/index';
import axios from 'axios';

interface RatingButtonProps extends BaseButtonProps {
  alreadyInList: boolean;
}

export function WatchlistButton({
  alreadyInList,
  withText,
  size,
  ...props
}: RatingButtonProps) {
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
    <Button size={size} onClick={toggleWatchlist} {...props}>
      <BookmarkPlus
        className={cn(
          size === 'icon' ? 'h-5 w-5' : 'h-7 w-7',
          inWatchlist && 'fill-foreground'
        )}
      />
      {withText && (
        <span className='ml-1.5'>{inWatchlist ? 'Delete' : 'Add'}</span>
      )}
    </Button>
  );
}
