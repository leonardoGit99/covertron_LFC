import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
};

function CustomPagination({ currentPage, totalPages, limit, onPageChange }: Props) {
  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <Pagination className='mb-6'>
      <PaginationContent>
        <PaginationItem>
          {/* Previous button */}
          <PaginationPrevious
            href="#"
            onClick={(e) => handleClick(e, currentPage - 1)}
            aria-disabled={isFirstPage}
            className={isFirstPage ? 'pointer-events-none opacity-50' : ''} // To disable previous button if its the first page
          />
        </PaginationItem>

        {/* Pages buttons */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Ellipsis (...)*/}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
            aria-disabled={isLastPage}
            className={isLastPage ? 'pointer-events-none opacity-50' : ''} // To disable next button when is the last page
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
