import type { IMovieDetails } from '@app/types/movies-types';
import { Separator } from '@ui/separator';

interface MovieOverviewProps {
  movie: IMovieDetails;
}

export default function MovieOverview({ movie }: MovieOverviewProps) {
  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>About</h2>
          <p className='text-sm text-muted-foreground'>About this movie.</p>
        </div>
      </div>
      <Separator className='my-4' />
      <span>{movie.overview}</span>
      <Separator className='my-4' />
      <div className='flex flex-col flex-wrap justify-between space-y-2 text-base md:flex-row md:items-center'>
        <div>
          <p>Status</p>
          <p className='text-sm text-foreground/70'>{movie.status}</p>
        </div>
        {movie.original_title && (
          <div>
            <p>Original Title</p>
            <p className='text-sm text-foreground/70'>{movie.original_title}</p>
          </div>
        )}
        <div>
          <p>Original Language</p>
          <p className='text-sm text-foreground/70'>
            {movie.original_language}
          </p>
        </div>
        <div>
          <p>Budget</p>
          <p className='text-sm text-foreground/70'>
            {movie.budget.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
        <div>
          <p>Revenue</p>
          <p className='text-sm text-foreground/70'>
            {movie.revenue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
