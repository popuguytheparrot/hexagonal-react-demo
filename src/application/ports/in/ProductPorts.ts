import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';

export interface GetProductsPort {
  execute(filter: ProductFilter, pagination: Pick<Pagination, 'page' | 'limit'>): Promise<ProductsResult>;
}

export interface GetProductByIdPort {
  execute(id: string): Promise<Product | null>;
}

export interface GetCategoriesPort {
  execute(): Promise<string[]>;
}
