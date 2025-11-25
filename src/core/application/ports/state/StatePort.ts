import type { Product } from '../../../domain/product/entities/Product';
import type { CartItem } from '../../../domain/cart/entities/CartItem';
import type { Notification } from '../../../domain/notification/entities/Notification';
import type { User } from '../../../domain/user/entities/User';

export interface CatalogFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  inStock: boolean | null;
}

export interface PaginationState {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface StatePort {
  // Catalog
  getProducts(): Product[];
  getFilteredProducts(): Product[];
  getFilters(): CatalogFilters;
  getPagination(): PaginationState;
  setFilters(filters: Partial<CatalogFilters>): void;
  setPage(page: number): void;
  resetFilters(): void;

  // Product
  getProductById(id: string): Product | undefined;

  // Cart
  getCartItems(): CartItem[];
  getCartCount(): number;
  getCartTotal(): number;
  addToCart(product: Product): void;
  removeFromCart(productId: string): void;

  // Notifications
  getNotifications(): Notification[];
  getUnreadCount(): number;
  markNotificationAsRead(id: string): void;

  // User
  getUser(): User | null;

  // Subscribe to changes
  subscribe(callback: () => void): () => void;
}
