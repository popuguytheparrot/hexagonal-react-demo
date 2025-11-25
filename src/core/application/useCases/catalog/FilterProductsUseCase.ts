import type { StatePort, CatalogFilters } from '../../ports/state/StatePort';

export class FilterProductsUseCase {
  private statePort: StatePort;

  constructor(statePort: StatePort) {
    this.statePort = statePort;
  }

  execute(filters: Partial<CatalogFilters>): void {
    this.statePort.setFilters(filters);
    // Reset to page 1 when filters change
    this.statePort.setPage(1);
  }
}
