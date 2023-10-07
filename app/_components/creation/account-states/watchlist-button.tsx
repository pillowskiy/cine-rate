import type { ToggleResponse } from '@app/types/creation-types';
import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { BookmarkPlus } from 'lucide-react';
import { cn } from '@libs/index';
import { useToast } from '@ui/use-toast';
import { fetch } from '@libs/common/fetch';

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
  const { toast } = useToast();

  async function toggleWatchlist() {
    fetch<ToggleResponse>(
      '/api/states/watchlist',
      {
        body: JSON.stringify({
          mediaType,
          creationId,
          watchlist: !inWatchlist,
        }),
        method: 'POST',
      }
    ).then(() => {
      setInWatchlist(!inWatchlist)
    }).catch((error) => {
      toast({
        title: 'Uh Oh! Something went wrong!',
        description: error.statusText,
        variant: 'destructive',
      });
    });
  }

  return (
    <Button size={size} onClick={toggleWatchlist} {...props}>
      <BookmarkPlus
        className={cn(
          size === 'sm' ? 'h-5 w-5' : 'h-7 w-7',
          inWatchlist && 'fill-foreground'
        )}
      />
      {withText && (
        <span className='ml-1.5'>{inWatchlist ? 'Unlist' : 'Add'}</span>
      )}
    </Button>
  );
}
