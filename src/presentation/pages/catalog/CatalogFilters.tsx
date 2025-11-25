import { useEffect, useCallback, type ChangeEvent } from 'react';
import { useDI, useProductState } from '../../../infrastructure/di';
import { useStatePort } from '../../shared/hooks';
import type { ProductFilter, Product, Pagination } from '../../../domain/product';
import './CatalogFilters.css';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

interface CatalogFiltersProps {
  onFilterChange?: (filter: ProductFilter) => void;
}

export function CatalogFilters({ onFilterChange }: CatalogFiltersProps) {
  const di = useDI();
  const productState = useProductState();
  const state = useStatePort<ProductState>(productState);
  
  useEffect(() => {
    di.getCategories.execute();
  }, [di.getCategories]);
  
  const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const newFilter: ProductFilter = {
      ...state.filter,
      category: e.target.value || undefined
    };
    onFilterChange?.(newFilter);
  }, [state.filter, onFilterChange]);
  
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ProductFilter = {
      ...state.filter,
      search: e.target.value || undefined
    };
    onFilterChange?.(newFilter);
  }, [state.filter, onFilterChange]);
  
  const handleMinPriceChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilter: ProductFilter = {
      ...state.filter,
      minPrice: value ? parseFloat(value) : undefined
    };
    onFilterChange?.(newFilter);
  }, [state.filter, onFilterChange]);
  
  const handleMaxPriceChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilter: ProductFilter = {
      ...state.filter,
      maxPrice: value ? parseFloat(value) : undefined
    };
    onFilterChange?.(newFilter);
  }, [state.filter, onFilterChange]);
  
  const handleClearFilters = useCallback(() => {
    onFilterChange?.({});
  }, [onFilterChange]);
  
  return (
    <div className="catalog-filters">
      <h3 className="filters-title">Filters</h3>
      
      <div className="filter-group">
        <label className="filter-label">Search</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Search products..."
          value={state.filter.search || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={state.filter.category || ''}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {state.categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            className="filter-input price-input"
            placeholder="Min"
            value={state.filter.minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <span className="price-separator">-</span>
          <input
            type="number"
            className="filter-input price-input"
            placeholder="Max"
            value={state.filter.maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
      
      <button className="clear-filters-btn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
}
