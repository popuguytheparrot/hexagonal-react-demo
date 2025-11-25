import type { StatePort } from '../../ports/state/StatePort';

export class ChangePaginationUseCase {
  private statePort: StatePort;

  constructor(statePort: StatePort) {
    this.statePort = statePort;
  }

  execute(page: number): void {
    const pagination = this.statePort.getPagination();
    if (page >= 1 && page <= pagination.totalPages) {
      this.statePort.setPage(page);
    }
  }
}
