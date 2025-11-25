import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../../../core/domain/product/entities/Product';
import { mockProducts } from '../../../data/mockData';
import type { CatalogFilters, PaginationState } from '../../../../core/application/ports/state/StatePort';

interface CatalogState {
  products: Product[];
  filters: CatalogFilters;
  pagination: {
    page: number;
    perPage: number;
  };
}

const initialState: CatalogState = {
  products: mockProducts,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    search: '',
    inStock: null,
  },
  pagination: {
    page: 1,
    perPage: 8,
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CatalogFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        search: '',
        inStock: null,
      };
      state.pagination.page = 1;
    },
  },
});

// Selectors
export const selectProducts = (state: { catalog: CatalogState }): Product[] => 
  state.catalog.products;

export const selectFilters = (state: { catalog: CatalogState }): CatalogFilters => 
  state.catalog.filters;

export const selectFilteredProducts = (state: { catalog: CatalogState }): Product[] => {
  const { products, filters } = state.catalog;
  
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }
    
    // Search filter
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // In stock filter
    if (filters.inStock !== null && product.inStock !== filters.inStock) {
      return false;
    }
    
    return true;
  });
};

export const selectPagination = (state: { catalog: CatalogState }): PaginationState => {
  const filteredProducts = selectFilteredProducts(state);
  const { page, perPage } = state.catalog.pagination;
  
  return {
    page,
    perPage,
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / perPage),
  };
};

export const selectPaginatedProducts = (state: { catalog: CatalogState }): Product[] => {
  const filteredProducts = selectFilteredProducts(state);
  const { page, perPage } = state.catalog.pagination;
  const startIndex = (page - 1) * perPage;
  
  return filteredProducts.slice(startIndex, startIndex + perPage);
};

export const { setFilters, setPage, resetFilters } = catalogSlice.actions;
export default catalogSlice.reducer;
