import type { Product } from '../entities/Product';
import type { ProductFilter } from '../value-objects/ProductFilter';
import type { Pagination } from '../value-objects/Pagination';

export interface ProductsResult {
  products: Product[];
  pagination: Pagination;
}

export interface ProductRepository {
  getProducts(filter: ProductFilter, pagination: Pick<Pagination, 'page' | 'limit'>): Promise<ProductsResult>;
  getProductById(id: string): Promise<Product | null>;
  getCategories(): Promise<string[]>;
}
