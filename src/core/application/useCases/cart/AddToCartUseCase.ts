import type { StatePort } from '../../ports/state/StatePort';
import type { Product } from '../../../domain/product/entities/Product';

export class AddToCartUseCase {
  private statePort: StatePort;

  constructor(statePort: StatePort) {
    this.statePort = statePort;
  }

  execute(product: Product): void {
    if (!product.inStock) {
      throw new Error('Cannot add out of stock product to cart');
    }
    this.statePort.addToCart(product);
  }
}
