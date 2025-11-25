import type { ProductFilter, Pagination } from '../../../domain/product';

export interface NavigationPort {
  navigate(path: string): void;
  getSearchParams(): URLSearchParams;
  setSearchParams(params: URLSearchParams): void;
  getCurrentPath(): string;
}

export interface UrlFilterPort {
  getFiltersFromUrl(): ProductFilter;
  getPaginationFromUrl(): Pick<Pagination, 'page' | 'limit'>;
  setFiltersToUrl(filter: ProductFilter): void;
  setPaginationToUrl(pagination: Pick<Pagination, 'page' | 'limit'>): void;
}
