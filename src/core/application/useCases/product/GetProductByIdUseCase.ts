import type { StatePort } from '../../ports/state/StatePort';
import type { Product } from '../../../domain/product/entities/Product';

export class GetProductByIdUseCase {
  private statePort: StatePort;

  constructor(statePort: StatePort) {
    this.statePort = statePort;
  }

  execute(id: string): Product | undefined {
    return this.statePort.getProductById(id);
  }
}
