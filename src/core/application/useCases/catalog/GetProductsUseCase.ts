import type { StatePort } from '../../ports/state/StatePort';
import type { Product } from '../../../domain/product/entities/Product';

export class GetProductsUseCase {
  private statePort: StatePort;

  constructor(statePort: StatePort) {
    this.statePort = statePort;
  }

  execute(): Product[] {
    return this.statePort.getProducts();
  }
}
