import { useCallback } from 'react';
import type { Pagination } from '../../../domain/product';
import { Button } from '../../shared/components';
import './CatalogPagination.css';

interface CatalogPaginationProps {
  pagination: Pagination;
  onPageChange?: (page: number) => void;
}

export function CatalogPagination({ pagination, onPageChange }: CatalogPaginationProps) {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  
  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      onPageChange?.(page - 1);
    }
  }, [page, onPageChange]);
  
  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      onPageChange?.(page + 1);
    }
  }, [page, totalPages, onPageChange]);
  
  const handlePageClick = useCallback((targetPage: number) => {
    onPageChange?.(targetPage);
  }, [onPageChange]);
  
  if (totalPages <= 1) {
    return null;
  }
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    let start = Math.max(1, page - Math.floor(showPages / 2));
    const end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }
    
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="catalog-pagination">
      <Button 
        variant="outline" 
        size="small"
        onClick={handlePrevPage}
        disabled={page <= 1}
      >
        ← Prev
      </Button>
      
      <div className="pagination-pages">
        {getPageNumbers().map((pageNum, index) => (
          typeof pageNum === 'number' ? (
            <button
              key={index}
              className={`pagination-page ${pageNum === page ? 'active' : ''}`}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          ) : (
            <span key={index} className="pagination-ellipsis">{pageNum}</span>
          )
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="small"
        onClick={handleNextPage}
        disabled={page >= totalPages}
      >
        Next →
      </Button>
    </div>
  );
}
