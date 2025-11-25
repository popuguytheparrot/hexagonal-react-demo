import type { Product, ProductFilter, Pagination, ProductsResult } from '../../../domain/product';
import type { Cart } from '../../../domain/cart';
import type { Notification } from '../../../domain/notification';
import type { User } from '../../../domain/user';

export interface StatePort<T> {
  getState(): T;
  subscribe(listener: () => void): () => void;
}

export interface ProductStatePort extends StatePort<{
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}> {
  setProducts(result: ProductsResult): void;
  setCurrentProduct(product: Product | null): void;
  setCategories(categories: string[]): void;
  setFilter(filter: ProductFilter): void;
  setPagination(pagination: Pick<Pagination, 'page' | 'limit'>): void;
  setLoading(loading: boolean): void;
  setError(error: string | null): void;
}

export type CartStatePort = StatePort<Cart>;

export type NotificationStatePort = StatePort<{
  notifications: Notification[];
  unreadCount: number;
}>;

export type UserStatePort = StatePort<{
  user: User | null;
}>;
