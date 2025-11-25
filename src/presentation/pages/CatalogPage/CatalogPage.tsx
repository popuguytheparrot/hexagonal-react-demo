import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCatalogProducts } from '../../hooks/usePorts';
import { ProductGrid } from './components/ProductGrid';
import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { setFilters, setPage } from '../../../infrastructure/state/redux/slices/catalogSlice';

export const CatalogPage: React.FC = () => {
  const products = useCatalogProducts();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const hasInitialized = useRef(false);

  // Sync URL params to state only on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const inStock = searchParams.get('inStock');
    const page = searchParams.get('page');

    // Apply filters from URL
    if (category || minPrice || maxPrice || search || inStock) {
      dispatch(setFilters({
        category: category || null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        search: search || '',
        inStock: inStock !== null ? inStock === 'true' : null,
      }));
    }

    // Set page from URL
    if (page) {
      dispatch(setPage(parseInt(page, 10)));
    }
  }, [searchParams, dispatch]);

  return (
    <div className="catalog-page">
      <h1 className="catalog-page__title">Product Catalog</h1>
      <div className="catalog-page__content">
        <aside className="catalog-page__sidebar">
          <Filters />
        </aside>
        <div className="catalog-page__main">
          <ProductGrid products={products} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};
