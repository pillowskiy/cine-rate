'use client';

import useQueryParams from '@hooks/useQueryParams';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/pagination';
import { useMemo } from 'react';
type PaginationGap = ('ellipsis' | number)[];

function createPaginationSchema(totalPages: number) {
  const pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
  const buildSchema = (page: number) => {
    if (page <= 1 || totalPages <= 1) return null;

    const gap: PaginationGap = pagination.slice(page - 1, page + 1);

    if (totalPages > 5) {
      switch (page < totalPages - 1) {
        case true:
          gap.push('ellipsis', totalPages);
          break;
        case false:
          gap.unshift(1, 'ellipsis');
          break;
      }
    } else {
      gap.push('ellipsis');
    }

    return gap;
  };

  return { buildSchema };
}

export function CreationReviewsPagination() {
  const { urlSearchParams, appendQueryParams } = useQueryParams();

  // TEMP
  const currentPage = +(urlSearchParams.get('page') ?? 1);
  const totalPages = +(urlSearchParams.get('totalPages') ?? 1);

  const paginationSchema = useMemo(() => {
    return createPaginationSchema(totalPages);
  }, [totalPages]);

  const pagination = paginationSchema.buildSchema(currentPage);

  if (!pagination) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => appendQueryParams({ page: currentPage - 1 })}
          disabled={currentPage <= 1}
        />
        {pagination.map((page, i) =>
          typeof page === 'number' ? (
            <PaginationLink
              key={i}
              onClick={() => appendQueryParams({ page })}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          ) : (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationNext
          onClick={() => appendQueryParams({ page: currentPage + 1 })}
          disabled={currentPage >= totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
}
