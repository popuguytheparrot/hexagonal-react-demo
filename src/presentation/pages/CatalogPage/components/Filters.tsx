import React, { useState, useEffect } from 'react';
import type { CatalogFilters as FiltersType } from '../../../../core/application/ports/state/StatePort';
import { useCatalogFilters, useCatalogActions } from '../../../hooks/usePorts';
import { Button } from '../../../components/ui/Button';

export const Filters: React.FC = () => {
  const filters = useCatalogFilters();
  const { setFilters, resetFilters } = useCatalogActions();
  
  // Local state for form inputs
  const [localFilters, setLocalFilters] = useState<FiltersType>(filters);
  
  // Sync local state with external filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setLocalFilters({ ...localFilters, category: value });
    setFilters({ category: value });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFilters({ ...localFilters, search: value });
  };
  
  const handleSearchSubmit = () => {
    setFilters({ search: localFilters.search });
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setLocalFilters({ ...localFilters, minPrice: value });
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setLocalFilters({ ...localFilters, maxPrice: value });
  };
  
  const handlePriceApply = () => {
    setFilters({
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
    });
  };
  
  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? true : null;
    setLocalFilters({ ...localFilters, inStock: value });
    setFilters({ inStock: value });
  };
  
  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      search: '',
      inStock: null,
    });
  };
  
  return (
    <div className="filters">
      <div className="filters__group">
        <label className="filters__label">Search</label>
        <div className="filters__search">
          <input
            type="text"
            className="filters__input"
            placeholder="Search products..."
            value={localFilters.search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <Button size="small" onClick={handleSearchSubmit}>
            Search
          </Button>
        </div>
      </div>
      
      <div className="filters__group">
        <label className="filters__label">Category</label>
        <select
          className="filters__select"
          value={localFilters.category || ''}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
        </select>
      </div>
      
      <div className="filters__group">
        <label className="filters__label">Price Range</label>
        <div className="filters__price-range">
          <input
            type="number"
            className="filters__input filters__input--price"
            placeholder="Min"
            value={localFilters.minPrice ?? ''}
            onChange={handleMinPriceChange}
            min={0}
          />
          <span className="filters__separator">-</span>
          <input
            type="number"
            className="filters__input filters__input--price"
            placeholder="Max"
            value={localFilters.maxPrice ?? ''}
            onChange={handleMaxPriceChange}
            min={0}
          />
          <Button size="small" onClick={handlePriceApply}>
            Apply
          </Button>
        </div>
      </div>
      
      <div className="filters__group filters__group--checkbox">
        <label className="filters__checkbox-label">
          <input
            type="checkbox"
            checked={localFilters.inStock === true}
            onChange={handleInStockChange}
          />
          <span>In Stock Only</span>
        </label>
      </div>
      
      <div className="filters__actions">
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
