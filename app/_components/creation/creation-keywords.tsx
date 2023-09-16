import type { CreationDetailsProps } from './common/types';
import type { MediaType } from '@app/types/index';
import { Separator } from '@ui/separator';
import { Button } from '@ui/button';
import { getTitle } from './common/utils';
import { getCreationKeywords } from '@actions/getCreationKeywords';
import Link from 'next/link';

interface CreationKeywordsProps extends CreationDetailsProps {
  mediaType: MediaType.Movie | MediaType.TV;
}

export default async function CreationKeywords({
  mediaType,
  details,
}: CreationKeywordsProps) {
  const { data } = await getCreationKeywords(details.id, mediaType).catch(
    () => ({ data: null })
  );

  if (!data?.keywords.length) return null;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Keywords</h2>
          <p className='text-sm text-muted-foreground'>
            Keywords of {getTitle(details)}.
          </p>
        </div>
      </div>
      <Separator className='my-4' />

      <div className='flex flex-wrap gap-2'>
        {data.keywords.map((keyword) => (
          <Link
            href={{
              pathname: `/${mediaType}`,
              query: {
                with_keywords: keyword.name,
              },
            }}
            key={keyword.id}
            passHref
            legacyBehavior
          >
            <Button className='h-7 text-sm' variant='outline'>
              {keyword.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
