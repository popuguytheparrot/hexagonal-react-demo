import type { StatePort, CatalogFilters } from '../../ports/state/StatePort';
import type { RouterPort } from '../../ports/router/RouterPort';

export class SyncFiltersFromUrlUseCase {
  private statePort: StatePort;
  private routerPort: RouterPort;

  constructor(statePort: StatePort, routerPort: RouterPort) {
    this.statePort = statePort;
    this.routerPort = routerPort;
  }

  execute(): void {
    const searchParams = this.routerPort.getSearchParams();
    
    const filters: Partial<CatalogFilters> = {};
    
    const category = searchParams.get('category');
    if (category) {
      filters.category = category;
    }
    
    const minPrice = searchParams.get('minPrice');
    if (minPrice) {
      filters.minPrice = parseFloat(minPrice);
    }
    
    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) {
      filters.maxPrice = parseFloat(maxPrice);
    }
    
    const search = searchParams.get('search');
    if (search) {
      filters.search = search;
    }
    
    const inStock = searchParams.get('inStock');
    if (inStock !== null) {
      filters.inStock = inStock === 'true';
    }
    
    const page = searchParams.get('page');
    
    // Apply filters first
    if (Object.keys(filters).length > 0) {
      this.statePort.setFilters(filters);
    }
    
    // Then set page
    if (page) {
      this.statePort.setPage(parseInt(page, 10));
    }
  }
}
