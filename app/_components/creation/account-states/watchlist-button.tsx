import type { BaseButtonProps } from './types';
import { useContext, useState } from 'react';
import { StatesContext } from '.';
import { Button } from '@ui/button';
import { BookmarkPlus } from 'lucide-react';
import { cn } from '@libs/index';
import { useToast } from '@ui/use-toast';
import ky from 'ky';
import { rejectKy } from '@libs/ky';

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
    ky.post('/api/states/watchlist', {
      body: JSON.stringify({
        mediaType,
        creationId,
        watchlist: !inWatchlist,
      }),
      method: 'POST',
    }).then(async (res) => {
      if (!res.ok) {
        const { message } = await rejectKy(res);
        return toast({
          title: 'Uh Oh! Something went wrong!',
          description: message,
          variant: 'destructive',
        });
      }
      setInWatchlist(!inWatchlist);
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
