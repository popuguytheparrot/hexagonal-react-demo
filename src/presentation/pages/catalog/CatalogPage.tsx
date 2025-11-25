import { 
  useEffect, 
  useCallback, 
  useMemo, 
  isValidElement, 
  cloneElement 
} from 'react';
import type { ReactNode, ReactElement } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDI, useProductState, useUrlFilter, navigationAdapter } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import type { ProductFilter, Product, Pagination } from '../../../domain/product';
import { Loader } from '../../shared/components';
import { ProductCard } from './ProductCard';
import { CatalogPagination } from './CatalogPagination';
import './CatalogPage.css';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

interface CatalogPageProps {
  filtersSlot?: ReactNode;
}

export function CatalogPage({ filtersSlot }: CatalogPageProps) {
  const di = useDI();
  const productState = useProductState();
  const urlFilter = useUrlFilter();
  const state = useStatePort<ProductState>(productState);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    navigationAdapter.setNavigate(navigate);
    navigationAdapter.setSearchParamsHook([searchParams, setSearchParams]);
  }, [navigate, searchParams, setSearchParams]);
  
  const filter = useMemo(
    () => urlFilter.getFiltersFromUrl(), 
    [searchParams, urlFilter]
  );
  
  const paginationFromUrl = useMemo(
    () => urlFilter.getPaginationFromUrl(), 
    [searchParams, urlFilter]
  );
  
  useEffect(() => {
    di.getProducts.execute(filter, paginationFromUrl);
  }, [di.getProducts, filter, paginationFromUrl]);
  
  const handleFilterChange = useCallback((newFilter: ProductFilter) => {
    urlFilter.setFiltersToUrl(newFilter);
  }, [urlFilter]);
  
  const handlePageChange = useCallback((page: number) => {
    urlFilter.setPaginationToUrl({ page, limit: paginationFromUrl.limit });
  }, [urlFilter, paginationFromUrl.limit]);
  
  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);
  
  return (
    <div className="catalog-page">
      {filtersSlot && (
        <aside className="catalog-sidebar">
          {isValidElement(filtersSlot) 
            ? cloneElement(filtersSlot as ReactElement<{ onFilterChange?: (filter: ProductFilter) => void }>, { onFilterChange: handleFilterChange })
            : filtersSlot
          }
        </aside>
      )}
      
      <div className="catalog-content">
        <div className="catalog-header">
          <h1 className="catalog-title">Products</h1>
          <span className="catalog-count">
            {state.pagination.total} products found
          </span>
        </div>
        
        {state.loading ? (
          <div className="catalog-loading">
            <Loader size="large" />
          </div>
        ) : state.error ? (
          <div className="catalog-error">
            <p>Error: {state.error}</p>
          </div>
        ) : (
          <>
            <div className="catalog-grid">
              {state.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
            
            {state.products.length === 0 && (
              <div className="catalog-empty">
                <p>No products found matching your criteria.</p>
              </div>
            )}
            
            <CatalogPagination
              pagination={state.pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
