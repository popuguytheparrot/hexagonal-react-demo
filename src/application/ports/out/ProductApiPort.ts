import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';

export interface ProductApiPort {
  fetchProducts(filter: ProductFilter, pagination: Pick<Pagination, 'page' | 'limit'>): Promise<ProductsResult>;
  fetchProductById(id: string): Promise<Product | null>;
  fetchCategories(): Promise<string[]>;
}
