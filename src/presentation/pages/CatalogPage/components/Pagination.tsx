import React from 'react';
import { usePagination, useCatalogActions } from '../../../hooks/usePorts';
import { Button } from '../../../components/ui/Button';

export const Pagination: React.FC = () => {
  const pagination = usePagination();
  const { setPage } = useCatalogActions();
  
  if (pagination.totalPages <= 1) {
    return null;
  }
  
  const handlePrevious = () => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1);
    }
  };
  
  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      setPage(pagination.page + 1);
    }
  };
  
  const handlePageClick = (page: number) => {
    setPage(page);
  };
  
  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const { page, totalPages } = pagination;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (page > 3) {
        pages.push('...');
      }
      
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      
      if (page < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="pagination">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={pagination.page === 1}
      >
        Previous
      </Button>
      
      <div className="pagination__pages">
        {getPageNumbers().map((pageNum, index) => (
          typeof pageNum === 'number' ? (
            <button
              key={index}
              className={`pagination__page ${pageNum === pagination.page ? 'pagination__page--active' : ''}`}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          ) : (
            <span key={index} className="pagination__ellipsis">{pageNum}</span>
          )
        ))}
      </div>
      
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={pagination.page === pagination.totalPages}
      >
        Next
      </Button>
      
      <span className="pagination__info">
        Showing {((pagination.page - 1) * pagination.perPage) + 1}-
        {Math.min(pagination.page * pagination.perPage, pagination.totalItems)} of {pagination.totalItems} items
      </span>
    </div>
  );
};
