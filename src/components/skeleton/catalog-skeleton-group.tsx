import { SkeletonArticle } from './skeleton-article';

interface CatalogSkeletonGroupProps {
  itemsCount?: number;
}

export function CatalogSkeletonGroup({
  itemsCount = 10,
}: CatalogSkeletonGroupProps) {
  return Array.from({ length: itemsCount }, (_, index) => (
    <SkeletonArticle key={index} className='mb-4 w-full' />
  ));
}
