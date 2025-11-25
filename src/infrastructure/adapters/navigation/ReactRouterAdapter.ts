import type { NavigationPort, UrlFilterPort } from '../../../application/ports/in';
import type { ProductFilter, Pagination } from '../../../domain/product';

type NavigateFunction = (path: string) => void;
type SearchParamsHook = [URLSearchParams, (params: URLSearchParams) => void];

export class ReactRouterNavigationAdapter implements NavigationPort {
  private navigateFn: NavigateFunction | null = null;
  private searchParams: URLSearchParams = new URLSearchParams();
  private setSearchParamsFn: ((params: URLSearchParams) => void) | null = null;
  private location: { pathname: string } = { pathname: '/' };

  setNavigate(navigate: NavigateFunction) {
    this.navigateFn = navigate;
  }

  setSearchParamsHook(searchParamsHook: SearchParamsHook) {
    this.searchParams = searchParamsHook[0];
    this.setSearchParamsFn = searchParamsHook[1];
  }

  setLocation(location: { pathname: string }) {
    this.location = location;
  }

  navigate(path: string): void {
    if (this.navigateFn) {
      this.navigateFn(path);
    }
  }

  getSearchParams(): URLSearchParams {
    return this.searchParams;
  }

  setSearchParams(params: URLSearchParams): void {
    if (this.setSearchParamsFn) {
      this.setSearchParamsFn(params);
    }
  }

  getCurrentPath(): string {
    return this.location.pathname;
  }
}

export class UrlFilterAdapter implements UrlFilterPort {
  constructor(private readonly navigation: NavigationPort) {}

  getFiltersFromUrl(): ProductFilter {
    const params = this.navigation.getSearchParams();
    const filter: ProductFilter = {};
    
    const category = params.get('category');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const search = params.get('search');
    
    if (category) filter.category = category;
    if (minPrice) filter.minPrice = parseFloat(minPrice);
    if (maxPrice) filter.maxPrice = parseFloat(maxPrice);
    if (search) filter.search = search;
    
    return filter;
  }

  getPaginationFromUrl(): Pick<Pagination, 'page' | 'limit'> {
    const params = this.navigation.getSearchParams();
    const page = params.get('page');
    const limit = params.get('limit');
    
    return {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 6
    };
  }

  setFiltersToUrl(filter: ProductFilter): void {
    const params = this.navigation.getSearchParams();
    const newParams = new URLSearchParams(params);
    
    if (filter.category) {
      newParams.set('category', filter.category);
    } else {
      newParams.delete('category');
    }
    
    if (filter.minPrice !== undefined) {
      newParams.set('minPrice', filter.minPrice.toString());
    } else {
      newParams.delete('minPrice');
    }
    
    if (filter.maxPrice !== undefined) {
      newParams.set('maxPrice', filter.maxPrice.toString());
    } else {
      newParams.delete('maxPrice');
    }
    
    if (filter.search) {
      newParams.set('search', filter.search);
    } else {
      newParams.delete('search');
    }
    
    newParams.set('page', '1');
    
    this.navigation.setSearchParams(newParams);
  }

  setPaginationToUrl(pagination: Pick<Pagination, 'page' | 'limit'>): void {
    const params = this.navigation.getSearchParams();
    const newParams = new URLSearchParams(params);
    
    newParams.set('page', pagination.page.toString());
    newParams.set('limit', pagination.limit.toString());
    
    this.navigation.setSearchParams(newParams);
  }
}
