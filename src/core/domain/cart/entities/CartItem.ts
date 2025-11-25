import type { Product } from '../../product/entities/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}
