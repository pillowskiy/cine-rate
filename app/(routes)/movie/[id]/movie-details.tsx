import type { IMovieDetails } from '@app/types/movies-types';
import type { ComponentProps } from 'react';
import { MediaType } from '@config/enums';
import CreationKeywords from '@components/creation/creation-keywords';
import { getTitle } from '@components/creation/common/utils';
import { MSeparator } from '@ui/separator';
import { Heading } from '@/app/_components/heading';

interface MovieDetailsProps extends ComponentProps<'div'> {
  details: IMovieDetails;
}

export default async function MovieDetails({
  details,
  ...props
}: MovieDetailsProps) {
  return (
    <div {...props}>
      <section>
        <Heading
          title='Details'
          description={`Interesting about ${getTitle(details)}.`}
        />
        <MSeparator className='my-4' />

        <ul className='space-y-6'>
          <li>
            <span className='font-semibold'>Status</span>
            <p className='text-foreground/70'>{details.status}</p>
          </li>

          <li>
            <span className='font-semibold'>Original Language</span>
            <p className='text-foreground/70'>
              {details.original_language.toUpperCase()}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Budget</span>
            <p className='text-foreground/70'>
              {details.budget
                ? details.budget.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                : 'Unknown'}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Revenue</span>
            <p className='text-foreground/70'>
              {details.revenue
                ? details.revenue.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                : 'Unknown'}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Production Companies</span>
            <p className='text-foreground/70'>
              {details.production_companies
                .map((company) => company.name)
                .join(', ')}
            </p>
          </li>
        </ul>
      </section>

      <CreationKeywords mediaType={MediaType.Movie} details={details} />
    </div>
  );
}
