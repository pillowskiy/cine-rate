import { cn } from '@libs/index';
import { Star } from 'lucide-react';
import { Button } from '@ui/button';
import { useContext, useState } from 'react';
import { StatesContext } from '.';

interface RatingButtonProps {
  initialRated: boolean;
}

export function RatingButton({ initialRated }: RatingButtonProps) {
  const { mediaType, creationId } = useContext(StatesContext);
  const [isRated, setIsRated] = useState(initialRated);

  return (
    <Button
      className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
      size='icon'
      variant='outline'
    >
      <Star
        className={cn('h-5 w-5', isRated && 'fill-yellow-500 text-yellow-500')}
      />
    </Button>
  );
}
