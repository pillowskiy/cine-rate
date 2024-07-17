'use client';

import { useContext, useMemo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#ui/pagination';
import { PaginationActionType, PaginationContext } from './common/hooks';

type PaginationGap = ('ellipsis' | number)[];

function createPaginationSchema(totalPages: number) {
  const pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
  const buildSchema = (page: number) => {
    if (page < 1 || totalPages <= 1) return null;

    const sliceStartIndex = page - 3 < 0 ? 0 : page - 3;
    const sliceEndIndex = page + 2;
    const gap: PaginationGap = pagination.slice(sliceStartIndex, sliceEndIndex);

    if (totalPages > 5) {
      switch (page < totalPages - 1) {
        case true:
          gap.pop();
          gap.push('ellipsis', totalPages);
          break;
        case false:
          gap.shift();
          gap.unshift(1, 'ellipsis');
          break;
      }
    }

    return gap;
  };

  return { buildSchema };
}

export function CreationReviewsPagination() {
  const [{ page: currentPage, totalPages }, dispatch] =
    useContext(PaginationContext);

  const paginationSchema = useMemo(() => {
    return createPaginationSchema(totalPages);
  }, [totalPages]);

  const pagination = paginationSchema?.buildSchema(currentPage);

  if (!pagination) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => dispatch({ type: PaginationActionType.PrevPage })}
          disabled={currentPage <= 1}
        />
        {pagination.map((page, i) =>
          typeof page === 'number' ? (
            <PaginationLink
              key={i}
              onClick={() =>
                dispatch({ type: PaginationActionType.SetPage, payload: page })
              }
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
          onClick={() => dispatch({ type: PaginationActionType.NextPage })}
          disabled={currentPage >= totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
}
