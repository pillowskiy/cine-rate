'use client';

import { ICreation } from '#types/creation-types';
import { MediaType } from '#config/enums';
import { CreationHorizontalArticle } from '#components/article/creation-article';
import Loader from '#components/loader';
import { NotFound } from '#components/not-found';

interface ResourceTabsItemsProps {
  mediaType: MediaType;
  items: ICreation[] | null;
}

export function ResourceTabsItems({
  mediaType,
  items,
}: ResourceTabsItemsProps) {
  if (!items) return <Loader />;
  if (!items.length) return <NotFound />;

  return items.map(
    (creation) =>
      mediaType && (
        <CreationHorizontalArticle
          key={creation.id}
          defaultMediaType={mediaType}
          className='border'
          creation={creation}
          alt='Series Backdrop'
          withStates
        />
      )
  );
}
