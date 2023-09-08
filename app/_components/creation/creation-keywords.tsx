import type { CreationDetailsProps } from './common/types';
import { Separator } from '@ui/separator';
import { Button } from '@ui/button';
import { getTitle } from './common/utils';
import { MediaType } from '@app/types/index';
import { getCreationKeywords } from '@actions/getCreationKeywords';

export default async function CreationKeywords({
  details,
}: CreationDetailsProps) {
  const { data } = await getCreationKeywords(details.id, MediaType.Movie).catch(
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
          <Button className='h-7 text-sm' key={keyword.id} variant='outline'>
            {keyword.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
