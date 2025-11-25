import type { GetProductsPort, GetProductByIdPort, GetCategoriesPort } from '../../ports/in';
import type { ProductApiPort, ProductStatePort } from '../../ports/out';
import type { ProductFilter, Pagination, Product, ProductsResult } from '../../../domain/product';

export class GetProductsUseCase implements GetProductsPort {
  constructor(
    private readonly productApi: ProductApiPort,
    private readonly productState: ProductStatePort
  ) {}

  async execute(filter: ProductFilter, pagination: Pick<Pagination, 'page' | 'limit'>): Promise<ProductsResult> {
    this.productState.setLoading(true);
    this.productState.setError(null);
    
    try {
      const result = await this.productApi.fetchProducts(filter, pagination);
      this.productState.setProducts(result);
      this.productState.setFilter(filter);
      this.productState.setPagination(pagination);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      this.productState.setError(errorMessage);
      throw error;
    } finally {
      this.productState.setLoading(false);
    }
  }
}

export class GetProductByIdUseCase implements GetProductByIdPort {
  constructor(
    private readonly productApi: ProductApiPort,
    private readonly productState: ProductStatePort
  ) {}

  async execute(id: string): Promise<Product | null> {
    this.productState.setLoading(true);
    this.productState.setError(null);
    
    try {
      const product = await this.productApi.fetchProductById(id);
      this.productState.setCurrentProduct(product);
      return product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
      this.productState.setError(errorMessage);
      throw error;
    } finally {
      this.productState.setLoading(false);
    }
  }
}

export class GetCategoriesUseCase implements GetCategoriesPort {
  constructor(
    private readonly productApi: ProductApiPort,
    private readonly productState: ProductStatePort
  ) {}

  async execute(): Promise<string[]> {
    try {
      const categories = await this.productApi.fetchCategories();
      this.productState.setCategories(categories);
      return categories;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      this.productState.setError(errorMessage);
      throw error;
    }
  }
}
